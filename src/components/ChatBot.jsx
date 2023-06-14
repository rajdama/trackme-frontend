import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../css/chatBot.css'
import Navbar from './Navbar'
import { male, female, getRandomInt } from './avatarget'
import { useEffect } from 'react'
import logo from './trackme-logo-rmvback.png'
import { getChatBotMessage } from '../actions/user_actions'

const ChatBot = ({ token }) => {
  // in useEffect when the page is loaded update the gender based on redux state currently i'm keeping it as female.
  const [gender, setgender] = useState('female')
  const user = useSelector((state) => state.user)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChatBotMessage(0, 0))
  }, [])

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  useEffect(() => {
    setMessage(user.chatBotMsg)
  }, [user.chatBotMsg])

  const handleFormSubmit = () => {
    dispatch(getChatBotMessage(inputText, token))
  }

  return (
    <div id="page-cont">
      <Navbar></Navbar>
      <div className="chat-container">
        <div className="chat-messages">
          {user.loading ? 'Loading...' : message}
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
