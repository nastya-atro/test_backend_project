import {useState} from "react";
import axios from "axios";

function LongPulling() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages',{
            message: value,
            id: Date.now()
        })
    }

    return (
        <>
            <div>
                <input type='text'
                       value={value}
                       onChange={(e)=>{setValue(e.target.value)}}/>
                <button onClick={sendMessage}>Send</button>
            </div>

            <div>
                {messages.map( m => (
                    <div key={m.id}>
                        {m.message}
                    </div>
                ))}
            </div>
        </>
    );
}

export default LongPulling;
