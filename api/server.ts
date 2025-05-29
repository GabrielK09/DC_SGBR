const express = require('express')
const cors = require('cors')
const dcController = require('./dcController/dcService.ts')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/api/discord/up', (req, res) => {
    res.status(200).json({
        success: true,
        health: 'Ok'
    });

})

app.post('/api/discord/messages-between', dcController.getBetweenMessages)

app.get('/api/discord/messages', dcController.getAllMessages)

app.post('/api/discord/send-message', dcController.sendMessage)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rodando na porta: http://192.168.1.103:${PORT}`)
})  