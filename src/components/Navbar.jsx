import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logo from './trackme-logo-rmvback.png'
import '../css/navbar.css'
import { signout } from '../actions/auth_actions'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(signout())
    window.location.reload()
  }

  return (
    <div id="Main-navbar">
      <div id="logo">
        <img src={logo} alt="" id="logo-img"></img>
      </div>
      <div id="nav-items">
        <button
          className="left-btn"
          id="btn-1"
          onClick={() => {
            navigate('/')
          }}
        ></button>
        <button
          className="left-btn"
          id="btn-2"
          onClick={() => {
            navigate('/mealplanner')
          }}
        ></button>
        <button
          className="left-btn"
          id="btn-3"
          onClick={() => {
            navigate('/excercise')
          }}
        ></button>
        <button
          className="left-btn"
          id="btn-4"
          onClick={() => {
            navigate('/chatbot')
          }}
        ></button>
        {/* <button className="left-btn" id="btn-5"></button> */}
      </div>
      <div
        onClick={() => {
          logout()
        }}
        id="sign-out"
      >
        <img
          src="https://img.icons8.com/?size=1x&id=SpwKcCvV9ulb&format=png"
          alt=""
        ></img>
      </div>
    </div>
  )
}
const Main = styled.div``
export default Navbar
