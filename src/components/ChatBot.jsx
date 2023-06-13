// import React,{useEffect} from 'react'
// import './chatBot.css'
// function ChatBot() {
//   useEffect(() => {
//     const OpenAI = require('openai-api');
//     const OPENAI_API_KEY = process.env.REACT_APP_CHATBOT;
//     const openai = new OpenAI(OPENAI_API_KEY);
//     console.log(process.env.REACT_APP_CHATBOT);
//     console.log(openai);
//     (async () => {
//         const gptResponse = await openai.complete({
//             engine: 'davinci',
//             prompt: 'this is a test',
//             maxTokens: 5,
//             temperature: 0.9,
//             topP: 1,
//             presencePenalty: 0,
//             frequencyPenalty: 0,
//             bestOf: 1,
//             n: 1,
//             stream: false,
//             stop: ['\n', "testing"]
//         });

//         console.log(gptResponse.data);
//     })();
//   },[]);
//   return (
//     <div id="chat-app">
//       <div id="chat_container"></div>
//       <form id = "form">
//         <textarea name="prompt" rows="1" cols="1" placeholder="Ask codex..."></textarea>
//         <button type="submit"><img src="assets/send.svg" alt="send"></img></button>
//       </form>
//     </div>
//   );
// }

// export default ChatBot

import React, { useState } from 'react'
import '../css/chatBot.css'
import Navbar from './Navbar'
import { male, female, getRandomInt } from './avatarget'

const ChatBot = () => {
  // in useEffect when the page is loaded update the gender based on redux state currently i'm keeping it as female.
  const [gender, setgender] = useState('female')
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (inputText.trim() !== '') {
      const newMessage = {
        text: inputText,
        sender: 'user',
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])

      // Simulate chatbot response (replace with your actual API call)
      const botResponse = {
        text: "This is the chatbot's response.",
        sender: 'bot',
      }
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse])
      }, 500)

      setInputText('')
    }
  }

  return (
    <div id="page-cont">
      <Navbar></Navbar>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === 'bot' ? 'bot' : 'user'
              }`}
            >
              <img
                id="disp-img"
                src={
                  message.sender === 'bot'
                    ? 'https://w7.pngwing.com/pngs/441/2/png-transparent-gray-shark-emoji-call-of-duty-ghosts-gymshark-fitness-centre-physical-exercise-cartoon-shark-cartoon-character-blue-marine-mammal-thumbnail.png'
                    : gender === 'male'
                    ? male[getRandomInt(0, 3)]
                    : female[getRandomInt(0, 3)]
                }
                alt=""
              />
              {message.text}
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="chat-input"
            placeholder="Send a message..."
            value={inputText}
            onChange={handleInputChange}
          />
          <img src="send-btn.svg" className="chat-submit-button"></img>
        </form>
      </div>
    </div>
  )
}

export default ChatBot
