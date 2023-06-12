import React, { useState } from 'react'
import Navbar from './Navbar'
// import { male, female, getRandomInt } from "./avatarget";
// import Loading from './Loading'
import Display from './Display'
import Profile from './Profile'
import '../css/Home.css'

function Home() {
  const date = new Date()
  let load = false

  let currentDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`

  const [currdate, setcurrdate] = useState(currentDate)
  const setcurrdatefunc = (e) => {
    console.log(e)
    setcurrdate(e)
  }

  return (
    <div id="Page-Home">
      {window.innerWidth >= 500 ? (
        load === true ? (
          <div>{/* <Loading /> */}</div>
        ) : (
          <div id="Main-Home">
            <Navbar />
            <Display currentDate={currdate} />
            <Profile setcurrdate={setcurrdatefunc} />
          </div>
        )
      ) : load === true ? (
        <div>{/* <Loading /> */}</div>
      ) : (
        <div id="Main-Home">
          <Navbar />
          <Display currentDate={currdate} />
          <Profile setcurrdate={setcurrdatefunc} />
        </div>
      )}
    </div>
  )
}

export default Home
