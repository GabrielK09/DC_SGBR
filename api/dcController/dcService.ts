import { Client, GatewayIntentBits, TextChannel } from 'discord.js'
import * as fs from 'fs';
import { format, parse } from 'date-fns'
import * as dotenv from 'dotenv';

dotenv.config();

const LIMIT = 100;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
        
    ]
});

const channelID = process.env.CHANNEL_ID;

client.once('ready', async () => {
    console.log(`Bot conectado como ${client.user?.tag}`);

});

// Token do bot
client.login(process.env.BOT_TOKEN); 

async function getLastMessageID()
{

}

async function getWinners (req, res) 
{   
    const { end } = req.body;
    const endDate = parse(end, 'dd/MM/yyyy', new Date());
    
    fs.appendFile('log/log_date.log', `endDate: ${endDate} | end: ${end} \n`, function (err) {
        if(err) console.error('Erro: ', err);
        
    });

    const channel = await client.channels.fetch(channelID);

    if(!channel.isTextBased())
    {
        return res.status(400).json({
            success: false,
            message: 'Canal não encontrado'
        });
    }

    let lastMessageID = null;
    let finish: boolean = false;
    let allMesages = [];

    fs.appendFile('log/logs.log', 'Entrando no while`\n', function (err) {
        if(err) console.error('Erro: ', err);
        
    });

    while (!finish) 
    {
        const messages = await channel.messages.fetch({ limit: LIMIT, before: lastMessageID });

        if(messages.size === 0 ) break;


        for (const msg of messages.values()) 
        {
            const rawCreate = new Date(msg.createdAt);
            const msgDate = parse(format(rawCreate, 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date);

            endDate.setHours(0, 0, 0, 0)
            msgDate.setHours(0, 0, 0, 0)

            fs.appendFile('log/log_date.log', `msgDate: ${msgDate} | rawCreate: ${rawCreate} | endDate: ${endDate} | msgDate < endDate: ${msgDate < endDate} \n`, function (err) {
                if(err) console.error('Erro: ', err);
                
            });

            if(msgDate < endDate)
            {
                lastMessageID = msg.id;
                finish = true

                allMesages.push({
                    message: msg.content,
                    id: msg.id
                })

                break;
            }
            
        }

        return res.status(200).json({
            message: 'ID encontrado',
            id: lastMessageID,
            messageContent: allMesages.find(msg => msg.id === lastMessageID)

        });


            /*const filterMessage = messages
                .filter(msg => {
                fs.appendFile('log/logs.log', 'Entrou no filter \n', function (err) {
                    if(err) console.error('Erro: ', err);
                    
                });

                const msgNewDate = new Date(msg.createdAt);
                const msgDate = parse(format(msgNewDate, 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date());

                fs.appendFile('log/log_date.log', `msgNewDate: ${msgNewDate} | msgDate: ${msgDate} | endDate: ${endDate} | msgDate < endDate ${msgDate < endDate} \n`, function (err) {
                    if(err) console.error('Erro: ', err);
                    
                });
                
                if(msgDate < endDate)
                {
                    lastMessageID = msg.id;
                    fs.appendFile('log/log_message_1.log', `Mensagens encontradas: ${msg.content} | criada: ${msgDate} | ID: ${msg.id} \n`, function (err) {
                        if(err) console.error('Erro: ', err);
                        
                    });
                    finish = true;
                } 
                
            })
            .map(msg => {
                fs.appendFile('log/logs.log', 'Entrou no map \n', function (err) {
                    if(err) console.error('Erro: ', err);
                    
                });

                const msgDate = format(msg.createdAt, 'dd/MM/yyyy');

                return {
                    message: msg.content,
                    id: msg.id,
                    create: msgDate

                };
            });

        allMesages = allMesages.concat(filterMessage);*/
    }
}

async function getRecorentMessages (req, res)
{
    const channel = await client.channels.fetch(channelID);

    if(!channel.isTextBased())
    {
        return res.status(400).json({
            success: false,
            message: 'Canal não encontrado'
        });
    }

    const messages = await channel.messages.fetch({ limit: LIMIT });

    const nfces = ['nfce', 'nfc-e']
    const sats = ['SAT', 'SAT C#'];

    const satMessages = messages
                      .filter(msg => 
                            sats.some(sat => msg.content.toLowerCase().includes(sat)))
                      .map(msg => ({
                            author: msg.author.tag,
                            message: msg.content,
                            date: msg.createdAt.toLocaleString('pt-BR')
                      }));

        const nfceMessages = messages
                      .filter(msg => 
                                nfces.some(nfce => msg.content.toLowerCase().includes(nfce))
                            )
                      .map(msg => ({
                            author: msg.author.tag,
                            message: msg.content,
                            date: msg.createdAt.toLocaleString('pt-BR')
                      }));
    
    try {
        res.status(200).json({
            success: true,
            satMessages: satMessages,
            nfceMessages: nfceMessages
        });

    } catch (error) {
        fs.appendFile('log/logs_error.log', `Erro na validação: ${error} \n`, function (err) {
            if(err) console.error('Erro: ', err);

        });

    }
}

async function getAllMessages(req, res) 
{
    try {
        const channel = await client.channels.fetch(channelID);

        if(!channel.isTextBased())
        {
            return res.status(400).json({
                success: false,
                message: 'Canal não encontrado'
            });
        }

        const messages = await channel.messages.fetch({ limit: LIMIT });

        const messageList = messages
            .filter(msg => msg.content.toLowerCase().includes('puxei'))
            .map(msg => ({
                author: msg.author.tag,
                message: msg.content,
                date: msg.createdAt.toLocaleString('pt-BR'),
                message_id: msg.id

            }));

        fs.appendFile('messages/messages.json', JSON.stringify(messageList, null, 2) + '\n', function (err) {
            if(err) console.error('Erro: ', err);
        })

        res.status(200).json({
            success: true,
            amout: messageList.length,
            message: 'Mensagens: ',
            messages: messageList

        });
        
    } catch (error) {
        fs.appendFile('log/logs_error.log', `Erro na validação: ${error} \n`, function (err) {
            if(err) console.error('Erro: ', err);

        });

        res.status(500).json({
            success: false,
            message: 'Erro interno',
            erro: error.message
            
        });

    } 
}

async function getBetweenMessages (req, res)
{
    const { start, end } = req.body;
    
    fs.appendFile('log/logs.log', `-- Datas recebidas: Start: ${start} e End: ${end} -- \n`, function (err) {
        if(err) console.error('Erro: ', err);

    });

    const channel = await client.channels.fetch(channelID);

    try {

        if(!channel.isTextBased())
        {
            return res.status(400).json({
                success: false,
                message: 'Canal não encontrado'
            });
        }

        const messages = await channel.messages.fetch({ limit: LIMIT });

        const startDate = parse(start, 'dd/MM/yyyy', new Date());
        const endDate = parse(end, 'dd/MM/yyyy', new Date());

        const filtredMessage = messages.
            filter(msg => {
                fs.appendFile('log/logs.log', `Data de criação da mensagem: ${format(msg.createdAt, 'dd/MM/yyyy')}\n`, function (err) {
                    if(err) console.error('Erro: ', err);

                });

                const msgDate = parse(format(msg.createdAt, 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date());

                return (
                        msgDate >= startDate && 
                        msgDate <= endDate && 
                        msg.content.toLowerCase().includes('puxei')

                    );
                
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
        fs.appendFile('log/logs_error.log', `Erro na validação: ${error} \n`, function (err) {
            if(err) console.error('Erro: ', err);

        });
        res.status(500).json({
            success: false,
            message: 'Erro interno',

        });
    }
}

async function sendMessage(req, res)
{
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
        fs.appendFile('log/logs_error.log', `Erro na validação: ${error} \n`, function (err) {
            if(err) console.error('Erro: ', err);
            
        });
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

export default {getRecorentMessages, getBetweenMessages, getAllMessages, sendMessage, getWinners }