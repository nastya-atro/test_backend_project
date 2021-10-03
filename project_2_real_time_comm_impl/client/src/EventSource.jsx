import {useEffect, useState} from "react";
import axios from "axios";

function EventSourcee() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')


    useEffect(()=>{
        getMessage()
    },[])

    const getMessage = async () => {
        const eventSource = new EventSource('http://localhost:5000/connect')
        eventSource.onmessage = function (event){
            console.log(event)
            const message = JSON.parse(event.data)
            console.log(message)
            setMessages((prev)=>[message, ...prev])
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages',{
            message: value,
            id: Date.now()
        })
    }

    return (
        <div className="center">
            <div>
                <h3>Event Source example</h3>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send message</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventSourcee;
