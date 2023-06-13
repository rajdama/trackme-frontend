import React, { useState } from 'react'
import Navbar from './Navbar'
// import { male, female, getRandomInt } from "./avatarget";
import Display from './Display'
import Profile from './Profile'
import '../css/Home.css'

function Home({ token }) {
  const date = new Date()

  let currentDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`

  const [currdate, setcurrdate] = useState(currentDate)
  const [currmonth, setcurrmonth] = useState(date.getMonth() + 1)
  const setcurrdatefunc = (e) => {
    console.log(e)
    setcurrdate(e)
  }

  const setcurrmonthfunc = (e) => {
    console.log(e)
    setcurrmonth(e)
  }

  return (
    <div id="Page-Home">
      {window.innerWidth >= 500 ? (
        <div id="Main-Home">
          <Navbar />
          <Display
            token={token}
            currentMonth={currmonth}
            currentDate={currdate}
          />
          <Profile
            setcurrmonth={setcurrmonthfunc}
            setcurrdate={setcurrdatefunc}
          />
        </div>
      ) : (
        <div id="Main-Home">
          <Navbar />
          <Display
            token={token}
            currentMonth={currmonth}
            currentDate={currdate}
          />
          <Profile
            setcurrmonth={setcurrmonthfunc}
            setcurrdate={setcurrdatefunc}
          />
        </div>
      )}
    </div>
  )
}

export default Home
