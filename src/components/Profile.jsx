import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSelector } from 'react-redux'
import { male } from './avatarget'

function Profile({ setcurrdate, setcurrmonth }) {
  const months = 'JanFebMarAprMayJunJulAugSepOctNovDec'
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  let dates = []

  if (user.currentMonthPlan.length !== 0) {
    if (user.currentMonthPlan.currentMonthMealPlans.length !== 0) {
      user.currentMonthPlan.currentMonthMealPlans.map((plan) => {
        let mealPlanExists = false
        const mealPlan = JSON.parse(plan.mealPlan)
        for (let i = 0; i < mealPlan.length; i++) {
          if (mealPlan[i].length != 0) {
            mealPlanExists = true
            break
          }
        }
        if (mealPlanExists) {
          let date = plan.date
          dates.push(parseInt(date.slice(0, date.indexOf('-'))))
        }
      })
    }
    if (user.currentMonthPlan.currentMontheExcercisePlans.length !== 0) {
      user.currentMonthPlan.currentMontheExcercisePlans.map((plan) => {
        let date = plan.date
        let day = parseInt(date.slice(0, date.indexOf('-')))
        if (!dates.includes(day)) dates.push(day)
      })
    }
  }

  const btns = document.querySelector(
    '.css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button'
  )
  const nexbtn = document.querySelector(
    '.css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button'
  )
  if (btns) {
    btns.addEventListener('click', () => {
      setTimeout(() => {
        const ele = document.querySelector(
          '.css-dplwbx-MuiPickersCalendarHeader-label'
        )
        let month = months.indexOf(`${ele.innerHTML.slice(0, 3)}`) / 3 + 1
        setcurrmonth(month)
      }, 1000)
    })
    nexbtn.addEventListener('click', () => {
      setTimeout(() => {
        const ele = document.querySelector(
          '.css-dplwbx-MuiPickersCalendarHeader-label'
        )
        let month = months.indexOf(`${ele.innerHTML.slice(0, 3)}`) / 3 + 1
        setcurrmonth(month)
      }, 1000)
    })
  }

  return (
    <div id="Prof">
      <div
        style={{
          height: '10vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          marginLeft: '10%',
          fontSize: '24px',
          color: 'black',
        }}
      >
        My Profile
      </div>
      <div id="prof-img">
        <img src={male[0]} alt=""></img>
        <div
          style={{
            height: '8vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            fontSize: '16px',
            color: 'black',
          }}
        >
          <strong>{auth.user.name}</strong>
        </div>
      </div>
      <div id="calendar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            id="wrap-cal"
            orientation="portrait"
            slots={{
              day: (props) => {
                const {
                  highlightedDays = [],
                  day,
                  outsideCurrentMonth,
                  ...other
                } = props

                const isSelected =
                  !props.outsideCurrentMonth &&
                  highlightedDays.indexOf(props.day.date()) >= 0
                return isSelected === true ? (
                  <PickersDay
                    id="day-green"
                    {...other}
                    outsideCurrentMonth={outsideCurrentMonth}
                    day={day}
                  />
                ) : (
                  <PickersDay
                    {...other}
                    id="day-red"
                    outsideCurrentMonth={outsideCurrentMonth}
                    day={day}
                  />
                )
              },
            }}
            slotProps={{
              day: {
                highlightedDays: dates,
              },
            }}
            onChange={(e) => {
              const d = String(`${e.$D}-${e.$M + 1}-${e.$y}`).trim()
              setcurrdate(d)
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  )
}

export default Profile
