// 02.240587,1,MEQCIHnug5zT1itWKQA61qHSI7z8EO4W8rOdETEJUEX3HGmHAiBdJZ/PzIYOhBOp3ZaCpUCB7Cr0evIoIuGN4eBNU16l5g==.iitkidcard
const extractRollNumber = (qrString) => {
    const matches = qrString.match(/\d{6}/g);
    if(!matches){
        return null;
    }
    return matches.find(code=>{
        const roll_num = Number(code);
        return roll_num >= 240001 && roll_num <= 240400; 
    })|| null;
};

const isRegistered = (rollNumber) => {
    return rollNumber >= 240001 && rollNumber <= 240400;
};

module.exports = {extractRollNumber, isRegistered};