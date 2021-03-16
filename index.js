const fs = require('fs');
require('dotenv').config()
const { Client } = require('discord.js');
let token = process.env.DISCORD_SECRET


const client = new Client();

client.on('ready', () => {
    console.log('logged in')
})

client.on('message', (message) => {
    console.log({ message: message.content })
    if (message.content.startsWith('!g')) {
        const list = getContent();
        let ranIdx = Math.floor(Math.random() * list.length - 1);
        message.reply(list[ranIdx]);
    }

    if (message.content.startsWith('!a' || '!add')) {
        let cleaned = message.content.replace('!a', '').trim();
        appendToContent('\n' + cleaned);
        message.reply(`Added: ${cleaned}`)
    }

    if (message.content.startsWith('!scare me')) {
        const files = fs.readdirSync('./pics');
        console.log({ files })
        let ranIdx = Math.floor(Math.random() * files.length - 1);
        message.channel.send('Message that goes above image', {
            files: [
                `./pics/${files[ranIdx]}`
            ]
        });
    }
})


client.login(token);


function getContent() {
    const data = fs.readFileSync('./tweets.txt',
        { encoding: 'utf8' });
    return data.split('\n').map(line => {
        return line.replace(/\n|\r/g, "");
    });

}

function appendToContent(content) {
    fs.appendFileSync('./tweets.txt', content);
}