import { Client, GatewayIntentBits, TextChannel } from 'discord.js'
import * as fs from 'fs';

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

function formatDate (dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
    
}

exports.getRecorentMessages = async (req, res) => 
{
    const channel = await client.channels.fetch(channelID);

    if(!channel.isTextBased())
    {
        return res.status(400).json({
            success: false,
            message: 'Canal não encontrado'
        });
    }

    const messages = await channel.messages.fetch({ limit: 100 });

    try {
        res.status(200).json({
            success: true,
            messages: messages
                      .filter(msg => msg.content.toLowerCase().includes('sat'))
                      .map(msg => ({
                            author: msg.author.tag,
                            message: msg.content,
                            date: msg.createdAt.toLocaleString('pt-BR')
                      }))
        });

    } catch (error) {
        
    }

}

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
    
    const channel = await client.channels.fetch(channelID);

    try {

        if(!channel.isTextBased())
        {
            return res.status(400).json({
                success: false,
                message: 'Canal não encontrado'
            });
        }

        const messages = await channel.messages.fetch({ limit: 100 });

        const filtredMessage = messages.
            filter(msg => {
                fs.appendFile('log/logs.log', `Data de criação da mensagem: ${formatDate(msg.createdAt)}\n`, function (err) {
                    if(err) throw err;

                });

                return formatDate(msg.createdAt) >= start && formatDate(msg.createdAt) <= end && msg.content.toLowerCase().includes('puxei')
                
            })

            .map(msg => ({
                author: msg.author.tag,
                message: msg.content,
                date: msg.createdAt.toLocaleString('pt-BR'),

            }));

        res.status(200).json({
            success: true,
            message: 'Mensagens: ',
            messages: filtredMessage,
            startDate: start,
            endDate: end,

        });
        
    } catch (error) {
        console.error('Erro: ', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno',

        });
    }
}

exports.sendMessage = async (req, res) => {
    let { message, amount } = req.body;
    const auxAmount = amount

    const channelFetch = await client.channels.fetch(channelID);

    if(!channelFetch)
    {
        return res.status(404).json({
            success: false,
            message: 'Canal não encontrado'
        });
    }

    const channel = channelFetch as TextChannel;

    try {
        while (amount > 0) {
            amount -= 1;
            channel.send(message);
            
        };
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Houve um erro durante o envio: ',
            erro: error

        });

    } finally {
        res.status(200).json({
            success: true,
            message: `Todas as ${auxAmount} mensagens foram enviadas!`
        });
    }
}

