import React, { useState } from "react";

const Session = () => {
    const [messages, setMessages] = useState([]);
    const [user,setUser] = useState("")

    const handleLLMReq = async(user) => {
        const options = {
            method:'POST',
            body:JSON.stringify({userId:user}),
            headers: {
                "Content-type": "application/json"
              }
        }
        const API = ''
        const response = await fetch(API,options)
        console.log(response)
        const data = await response.json()
        console.log(data)
        const org_data = data.map(e => {
            return JSON.parse(e.output).response
        })
        console.log(org_data)
        setMessages([...messages,{id: Date.now(), text: org_data}])
    }

    const handleSend = () => {
        if (user !== "") {
            setMessages([...messages, { id: Date.now(), text: user }]);
            setUser("");
            handleLLMReq(user)
        }else{
            alert("Please provide the userId")
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="bg-blue-600 text-white text-center py-4 shadow">
                <h1 className="text-xl font-bold">Session Retriever</h1>
            </div>


            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className="bg-blue-100 p-3 rounded-lg max-w-sm self-end text-gray-900 shadow-md"
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            <div className="flex items-center p-4 bg-white border-t">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Type your userId..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSend}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Session;
