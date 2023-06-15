import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../css/chatBot.css'
import Navbar from './Navbar'
import { male, female, getRandomInt } from './avatarget'
import { useEffect } from 'react'
import logo from './send-btn.svg'
import { getChatBotMessage } from '../actions/user_actions'

const ChatBot = ({ token }) => {
  // in useEffect when the page is loaded update the gender based on redux state currently i'm keeping it as female.
  const [gender, setgender] = useState('female')
  const user = useSelector((state) => state.user)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChatBotMessage(0, 0))
  }, [])

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  useEffect(() => {
    if (user.chatBotMsg != '') {
      const botResponse = {
        text: `${user.chatBotMsg}`,
        sender: 'bot',
      }
      setMessages((prevMessages) => [...prevMessages, botResponse])
    } else {
      setMessages([])
    }
  }, [user.chatBotMsg])

  const handleFormSubmit = () => {
    dispatch(getChatBotMessage(inputText, token))
    if (inputText.trim() !== '') {
      const newMessage = {
        text: inputText,
        sender: 'user',
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
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
                    : male[0]
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
          <img
            onClick={() => {
              handleFormSubmit()
            }}
            src={logo}
            className="chat-submit-button"
            alt=""
          ></img>
        </form>
      </div>
    </div>
  )
}

export default ChatBot
