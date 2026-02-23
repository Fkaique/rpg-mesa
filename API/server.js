import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

const rooms = []

app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.get('/rooms', (req, res) => {
    res.send(rooms)
})

app.post('/rooms', (req, res) => {
    const {name, pass} = req.body

    if (!name || !pass) {
        return res.status(400).send("solicitação inválida! a sala deve ter um nome e uma senha.")
    }
    if (name.length === 0 || pass.length === 0) {
        return res.status(400).send("solicitação inválida! os campos devem ter pelo menos 1 caracter.")
    }

    const roomExists = rooms.find(r => r.name === name)

    if (roomExists) {
        return res.status(400).send("Já existe uma sala com esse nome.")
    }

    const newRoom = { name, pass }
    rooms.push(newRoom)

    res.status(201).send(newRoom)
})

app.delete('/rooms/:name', (req, res) => {
    const { name } = req.params

    const index = rooms.findIndex(e => e.name === name)

    if (index === -1) {
        return res.status(404).send("Sala não encontrada.")
    }

    rooms.splice(index, 1)
    
    res.send(rooms)
})

app.listen(port, () => {
    console.log(`Servidor inicializado na porta: ${port}`);
})