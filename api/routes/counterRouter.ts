import express from 'express'

const router = express.Router()

router.get('/up', (req, res) => {
    res.json({
        message: 'Rota funcionando'
    })
});

router.get('/counters', (req, res) => {
    res.json({
        message: 'Rota aqui'
    })
})

export default router;