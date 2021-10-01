const express = require('express')
const cors = require('cors')
const events = require('events')

const PORT = 5000;
const app = express()
const emitter = new events.EventEmitter();
app.use(express.json())

app.use(cors())

app.get('/get-messages', ((req, res) => {
emitter.once('newMessage', (message) => {
    res.json(message)
})
}))

app.post('/new-messages', ((req, res) => {
    console.log(req.body)
    const message = req.body;
    emitter.emit(('newMessage', message))
    return res.json(message)
}))


app.listen(PORT, ()=> console.log('server started on port 5000'))