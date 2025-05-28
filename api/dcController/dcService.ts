const { Client, GatewayIntentBits, Message } = require('discord.js')
const fs = require('fs');
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const channelID = process.env.CHANNEL_ID;

client.once('ready', async () => {
    console.log(`Bot conectado como ${client.user.tag}`);

});

// Token do bot
client.login(process.env.BOT_TOKEN); 

exports.getAllMessages = async (req, res) => {
    try {
        const channel = await client.channels.fetch(channelID);

        if(!channel.isTextBased())
        {
            return res.status(400).json({
                success: false,
                message: 'Canal não encontrado'
            });
        }

        const messages = await channel.messages.fetch({ limit: 100 });

        const messageList = messages
            .filter(msg => msg.content.toLowerCase().includes('puxei'))
            .map(msg => ({
                author: msg.author.tag,
                message: msg.content,
                date: msg.createdAt.toLocaleString('pt-BR')

            }));

        fs.appendFile('messages/messages.json', JSON.stringify(messageList, null, 2) + '\n', function (err) {
            if (err) throw err;
        })

        res.status(200).json({
            success: true,
            message: 'Mensagens: ',
            messages: messageList
        });
        
    } catch (error) {
        console.error('Erro: ', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno',
            erro: error.message
            
        });

    } 
}

exports.getBetweenMessages = async (req, res) => {
    const { start, end } = req.body;
    
    try {
        const channel = await client.channels.fetch(channelID);

        if(!channel.isTextBased())
        {
            return res.status(400).json({
                success: false,
                message: 'Canal não encontrado'
            });
        }

        const messages = await channel.messages.fetch({ limit: 100 });
        let datas = [start, end]
        const filtredMessage = messages.
            filter(msg => {
                const msgDate = new Date(msg.createdAt);
                const msgDateFormated = msgDate.toISOString().split('T')[0]; // data que a mensagem foi enviada
                const startDate = new Date(start).toISOString().split('T')[0]; // data inicial
                const endDate = new Date(end).toISOString().split('T')[0]; // data final
                
                return msgDateFormated >= startDate && msgDateFormated <= endDate;
            })
            .map(msg => ({
                author: msg.author.tag,
                message: msg.content,
                date: msg.createdAt.toLocaleString('pt-BR')
            }));

        res.status(200).json({
            success: true,
            datas: datas,
            message: 'Mensagens: ',
            messages: filtredMessage

        });
        
    } catch (error) {
        console.error('Erro: ', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno',
            erro: error

        });
    }
}

