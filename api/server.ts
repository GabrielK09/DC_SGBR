const express = require('express')
const cors = require('cors')
const dcController = require('./dcController/dcService.ts')
const app = express();
const PORT = 3000

app.use(express.json())
app.use(cors())

app.get('/up', (req, res) => {
    res.status(200).json({
        success: true,
        health: 'Ok'
    });

})

app.post('/messages-between', dcController.getBetweenMessages)

app.get('/messages', dcController.getAllMessages)

app.listen(PORT, () => {
    console.log(`Rodando na porta: http://localhost:${PORT}`)
})  