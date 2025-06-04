import express from 'express';
import cors from 'cors';
import dcController from './dcController/dcService.js';
import middleware from './middleware/checkUser.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/api/discord/up', (req, res) => {
    res.status(200).json({
        success: true,
        health: 'Ok'

    });
});

app.get('/api/discord/messages', middleware.checkAuthUser, dcController.getAllMessages)

app.get('/api/discord/recorent-messages', middleware.checkAuthUser, dcController.getRecorentMessages)

app.post('/api/discord/winners', middleware.checkAuthUser, dcController.getWinners);

app.post('/api/discord/messages-between', middleware.checkAuthUser, dcController.getBetweenMessages)

app.post('/api/discord/send-message', middleware.checkAuthUser, dcController.sendMessage)


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rodando na porta: http://${process.env.URL}:${PORT}`);

});