import { Client, GatewayIntentBits, TextChannel } from 'discord.js'
import * as fs from 'fs';
import { format, parse } from 'date-fns'
import * as dotenv from 'dotenv';

type bodyMessage = {
    id: string,
    author: string,
    content: string,
    create: string
}

type winner = {
    label: string,
    color: string,
    score: number
}

dotenv.config();

process.env.TZ;

const LIMIT: number = 100;
const GOAL: number = 50;

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

function selectWinners(messages: bodyMessage[]) 
{
    /*  1 = 🔵 | 2 = 🟢 | 3 = 🟣 | 4 = 🌑 | 5 = 🍊 | 6 = 🟡 | 7 = 🟤 | 8 = 🔴 | */
    let count = [
        { label: '1', color: '🔵', score: 0 },
        { label: '2', color: '🟢', score: 0 },
        { label: '3', color: '🟣', score: 0 },
        { label: '4', color: '🌑', score: 0 },
        { label: '5', color: '🍊', score: 0 },
        { label: '6', color: '🟡', score: 0 },
        { label: '7', color: '🟤', score: 0 },
        { label: '8', color: '🔴', score: 0 },

    ]; 

    for (const message in messages)
    {
        if(Object.prototype.hasOwnProperty.call(messages, message)) 
        {
            const element: bodyMessage = messages[message];
            const lastColor: string = element.content.trim().split(' ').pop();
            
            const counter = count.find(c => c.color === lastColor);

            if(counter) counter.score += 1;
        }

    }    
    return count;
}

function orderWinners(colorScore: winner[]) 
{
    const GOAL: number = 50;
    
    const sorted = [...colorScore].sort((a, b) => b.score - a.score);

    const winners = sorted.filter(w => w.score > GOAL);

    return winners;
    
}

async function getWinners (req, res) 
{   
    console.log('Chamou o getWinners')
    const { after, before } = req.body;

    if(!after || !before)
    {
        console.log('Entrou no if de after && before');
        return res.status(422).json({
            message: 'Dados ausentes ou fora do formato',
            after: after ? true : false,
            before: before ? true : false

        });
    }

    const [d1, m1, y1] = before.split('/');
    const beforeDate = new Date(+y1, +m1 - 1, +d1);
    beforeDate.setHours(0, 0, 0, 0);

    const [d2, m2, y2] = after.split('/');
    const afterDate = new Date(+y2, +m2 - 1, +d2);
    afterDate.setHours(0, 0, 0, 0);

    const channel = await client.channels.fetch(channelID);

    if(!channel.isTextBased())
    {
        return res.status(400).json({
            success: false,
            message: 'Canal não encontrado'
        });
    }

    let lastMessageID: any = null;
    let finish: boolean = false;
    let allMesages: bodyMessage[] = [];

    while (!finish) 
    {
        const messages = await channel.messages.fetch({ limit: LIMIT, before: lastMessageID });

        if(messages.size === 0 ) break;

        for (const msg of messages.values())
        {
            const msgDate = new Date(msg.createdAt);
            msgDate.setHours(0, 0, 0, 0);

            fs.appendFile('log/log_date.log', `msgDate + ID: ${format(msgDate, 'dd/MM/yyyy')} + ${msg.id} | beforeDate: ${format(beforeDate, 'dd/MM/yyyy')} | msgDate < before: ${msgDate < before} \n`, function (err) {
                if(err) console.error('Erro: ', err);
                
            });

            if(msgDate < afterDate)    
            {
                finish = true;
                break;

            }

            if(
                msgDate >= afterDate 
                && msgDate <= beforeDate 
                && msg.content.includes('puxei')
            )
            {     
                allMesages.push({
                    id: msg.id,
                    author: msg.author?.tag,
                    content: msg.content,
                    create: format(msg.createdAt, 'dd/MM/yyyy')

                });

                fs.appendFile('messages/messages.json', JSON.stringify(allMesages, null, 2) + ',\n', function (err) {
                    if(err) console.error('Erro: ', err);
                })
            }
            lastMessageID = msg.id;
        }
        
    }

    const winners = selectWinners(allMesages);
    
    if(winners)
    {
        return res.status(200).json({
            success: true,
            message: 'Vencedores',
            winners: orderWinners(winners)

        });

    } else {
        return res.status(400).json({
            success: false,
            message: 'Erro desconhecido',
            
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

export default { getBetweenMessages, getAllMessages, sendMessage, getWinners }