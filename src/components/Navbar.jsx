import React from 'react'
import styled from 'styled-components'
function Navbar() {
  return (
    <Main>
      <div id="logo">
        <img src="logo192.png" alt="" id="logo-img"></img>
      </div>
      <div id="nav-items">
        <button className="left-btn" id="btn-1"></button>
        <button className="left-btn" id="btn-2"></button>
        <button className="left-btn" id="btn-3"></button>
        <button className="left-btn" id="btn-4"></button>
        <button className="left-btn" id="btn-5"></button>
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
  height: 100vh;
  width: 5vw;
  #nav-items {
    width: 100%;
    height: 35vh;
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
  #btn-3 {
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
`
export default Navbar
