import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate()
  return (
    <Main>
      <div id="logo">
        <img src="logo192.png" alt="" id="logo-img"></img>
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
            navigate('/mealPlanner')
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
            navigate('/chatBot')
          }}
        ></button>
        {/* <button className="left-btn" id="btn-5"></button> */}
      </div>
      <div id="sign-out">
        <img
          src="https://img.icons8.com/?size=1x&id=SpwKcCvV9ulb&format=png"
          alt=""
        ></img>
      </div>
    </Main>
  )
}
const Main = styled.div`
  @media (min-width: 500px) {
    height: 100vh;
    width: 5vw;
    #nav-items {
      width: 100%;
      height: 30vh;
      margin-top: 5vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    #nav-items > button {
      width: 40px;
      height: 40px;
      background-color: transparent;
      border: 0px solid transparent;
      &:hover {
        background-color: wheat;
        border-radius: 10px;
      }
    }
    #logo-img {
      height: 40px;
      width: 40px;
    }
    #logo {
      height: 20%;
      margin-top: 2vh;
    }
    .left-btn {
      background-image: url('https://cdn-icons-png.flaticon.com/128/69/69524.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 20px 20px;
    }
    #btn-2 {
      background-image: url('https://img.icons8.com/?size=1x&id=JGXEG6IVwUBC&format=png');
      background-size: 40px 40px;
    }
    #btn-3 {
      background-image: url('https://img.icons8.com/?size=1x&id=Lma6WBeVR9Uc&format=png');
      background-size: 30px 30px;
    }
    #btn-4 {
      background-image: url('https://cdn-icons-png.flaticon.com/128/4712/4712027.png');
      background-size: 30px 30px;
    }
    #sign-out {
      margin-top: 30vh;
    }
    #sign-out > img {
      height: 20px;
      width: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  @media (max-width: 500px) {
    height: 10vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    z-index: 100;
    background-color: white;
    #nav-items {
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-left: auto;
    }
    #nav-items > button {
      width: 40px;
      height: 40px;
      background-color: transparent;
      border: 0px solid transparent;
      &:hover {
        background-color: wheat;
        border-radius: 10px;
      }
    }
    #logo-img {
      height: 40px;
      width: 40px;
    }
    #logo {
      height: 20%;
      margin-top: 2vh;
      display: none;
    }
    .left-btn {
      background-image: url('https://cdn-icons-png.flaticon.com/128/69/69524.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 20px 20px;
    }
    #btn-2 {
      background-image: url('https://img.icons8.com/?size=1x&id=JGXEG6IVwUBC&format=png');
      background-size: 40px 40px;
    }
    #btn-3 {
      background-image: url('https://img.icons8.com/?size=1x&id=Lma6WBeVR9Uc&format=png');
      background-size: 30px 30px;
    }
    #btn-4 {
      background-image: url('https://cdn-icons-png.flaticon.com/128/4712/4712027.png');
      background-size: 30px 30px;
    }
    #sign-out {
      margin-top: 3vh;
      margin-left: auto;
      margin-right: 2vw;
      margin-bottom: 3vh;
    }
    #sign-out > img {
      height: 20px;
      width: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`
export default Navbar
