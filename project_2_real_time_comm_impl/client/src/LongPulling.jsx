import {useEffect, useState} from "react";
import axios from "axios";

function LongPulling() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(()=>{
        getMessage()
    },[])

    const getMessage = async () => {
        try{
           const {data} =  await axios.get('http://localhost:5000/get-messages')
            setMessages(prevMessage=>[data, ...prevMessage])
           await getMessage()
        }catch (e){
            setTimeout(()=>{
                getMessage()
            }, 500)
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
                <h3>Long polling example</h3>
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

export default LongPulling;
