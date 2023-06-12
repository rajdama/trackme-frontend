import React from 'react'
import styled from 'styled-components'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function Profile({ setcurrdate }) {
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
        <img src={''} alt=""></img>
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
          {'raj'}
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
                highlightedDays: [2, 3, 4, 6, 12, 15],
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
