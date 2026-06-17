# IITK Attendance Bot

An automated Telegram bot designed to mark attendance of IITK Students.

## Features

* Scan QR codes sent as images on Telegram.
* Extract roll numbers from QR data.
* Validate registered roll numbers.
* Mark attendance and store it in attendance.json.
* Prevent duplicate attendance entries.

## Setup

### Install Dependencies

```bash
npm install
```

### Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### Create a Telegram Bot

1. Open Telegram.
2. Search for **@BotFather**.
3. Run `/newbot`.
4. Follow the instructions to create a bot.
5. Copy the token.

### Create a .env file

```env
TELEGRAM_BOT_TOKEN=your_actual_bot_token
```

## Run the Bot

```bash
node bot.js
```

## Commands

* `/start` - Start the bot.
* `/stats` - View attendance statistics.


## Notes

These files are initentionally not included in the submission
```gitignore
node_modules/
.env
attendance.json
```

