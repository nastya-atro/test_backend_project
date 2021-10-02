import { useRef, useState} from "react";

function WEbSocket() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [username, setUsername] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)


    function connect (){
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            console.log('Socket connection started')
            setConnected(true)
            const message = {
                event: 'connection',
                username: username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev=>[message, ... prev])
        }
        socket.current.onerror = () => {
            console.log('Socket error')
        }
        socket.current.onclose = () => {
            console.log('Socket close')
        }
    }


    const sendMessage = async () => {
        const message = {
            event: 'message',
            username: username,
            message: value,
            id: Date.now()
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Write your name"/>
                    <button onClick={connect}>Join</button>
                </div>
            </div>
        )
    }


    return (
        <div className="center">
            <div>
                <h3>WebSocket example</h3>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send message</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className='connection_message'>User {mess.username} joined</div>
                                :<div className='message'>{mess.username}  {mess.message}</div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WEbSocket;
