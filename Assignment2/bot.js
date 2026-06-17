require('dotenv').config();

const fs = require('fs');
const path = require('path');
const {decodeQR} = require('./qr');
const {markPresent, getStats} = require('./attendance');
const {isRegistered, extractRollNumber} = require('./parser');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to the Attendance Bot! Please send a QR code to mark your attendance.');
});
bot.on('photo', async (msg) => {
    try{
        const photo = msg.photo[msg.photo.length - 1];
        const fileId = photo.file_id;
        let imgPath;
        const dimgPath = path.join('./temp', fileId);
        if(!fs.existsSync(dimgPath)){
            fs.mkdirSync(dimgPath, {recursive: true});
        }
        try{
            imgPath = await bot.downloadFile(fileId, dimgPath);
        }catch(error){
            throw new Error('Error in downloading image');
        }
        const qrString = await decodeQR(imgPath);
        const rollNumber = extractRollNumber(qrString);

        if(!rollNumber){
            return bot.sendMessage(msg.chat.id, 'Invalid QR code. Please try again with a valid QR code.');
        }
        if(!isRegistered(rollNumber)){
            return bot.sendMessage(msg.chat.id, 'Your Roll Number is not registered.');
        }
        const result = markPresent(rollNumber);
        if(result.success){
            bot.sendMessage(msg.chat.id, `Attendance marked successfully for ${rollNumber}`);
        }else{
            bot.sendMessage(msg.chat.id, `Attendance already marked at ${result.timestamp}`);
        }
    }catch(error){
        console.error(error);
        bot.sendMessage(msg.chat.id, 'Failed to scan QR Code. Please try again later.');
    }
});

bot.onText(/\/stats/, (msg) => {
    const stats = getStats();
    bot.sendMessage(msg.chat.id, `Total Students Present: ${stats.total}\nRoll Numbers: ${stats.rollNumbers.join(', ')}`);
});

