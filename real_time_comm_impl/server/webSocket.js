const ws = require('ws')

const wss = new ws.Server({
    port: 5000
}, ()=>{
    console.log('WS server started')
})

wss.on('connection', function connection(ws){
    ws.on('message', function (message){
        message = JSON.parse(message)
        switch (message.event){
            case 'message':
                sendMessageToAllUsers(message)
                break;
            case 'connection'  :
                sendMessageToAllUsers(message)
                break;
        }
    })
})

const sendMessageToAllUsers = (message) =>{
    wss.clients.forEach((client)=>{
        client.send(JSON.stringify(message))
    })
}

const message = {
    event: 'connection/message',
    id: 123,
    date: '01.10.21',
    username: 'Nastya',
    message: 'Hei'
}