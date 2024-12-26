import React, { useState } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [user,setUser] = useState("")

    const handleLLMReq = async(url,user) => {
        const options = {
            method:'POST',
            body:JSON.stringify({img_url:url,userId:user}),
            headers: {
                "Content-type": "application/json"
              }
        }
        const API = ''
        const response = await fetch(API,options)
        console.log(response)
        let data = await response.json()
        console.log(JSON.parse(data).flags)
        data = JSON.parse(data)
        const orgDataArr = data["flags"].map((e,i) => `${i+1}. Flag : ${e.flag_type}. Admin description : ${e.description_admin} Test Taker description : ${e.description_test_taker} Confidence : ${e.confidence}`)
        const finalOutput = orgDataArr.join(' ')
        setMessages([...messages,{id: Date.now(), text: finalOutput}])
    }

    const handleSend = () => {
        if (input.trim() !== "" && user !== "") {
            setMessages([...messages, { id: Date.now(), text: input }]);
            setInput("");
            handleLLMReq(input,user)
        }else{
            alert("Please provide the userId and Image URL")
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="bg-blue-600 text-white text-center py-4 shadow">
                <h1 className="text-xl font-bold">Image Analyzer</h1>
            </div>

            <div className="bg-blue-600 text-center py-4 shadow">
                <h1 className="text-xl text-white font-bold">UserID</h1>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Type your userId..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
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
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
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

export default Chat;
