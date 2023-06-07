import React, { useState, useEffect } from 'react'
// import Navbar from './Navbar';
import { CircularProgressbar } from 'react-circular-progressbar'
// import 'react-circular-progressbar/dist/styles.css'
// import { male, female, getRandomInt } from './avatarget'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import '../css/home.css'

function Home() {
  //instead of these variable use the data stored in redux wherever necessary
  const gender = 'male'
  // const ind = getRandomInt(0, 3)
  const name = 'Aryan Mankame'
  const firstName = 'Aryan'
  const [load, setload] = useState(true)
  const [currdate, setcurrdate] = useState('5-6-2023')
  useEffect(() => {
    setTimeout(() => {
      setload(false)
      // console.log('Im =>',load)
    }, 2000)
    setUserData({
      '5-6-2023': [
        [
          {
            Breakfast: [
              {
                img: 'https://img.freepik.com/premium-photo/masala-dosa-is-south-indian-meal-served-with-sambhar-coconut-chutney-selective-focus_466689-22933.jpg?size=626&ext=jpg&ga=GA1.2.738037006.1685704227&semt=sph',
                name: 'Dosa',
                cal: 170,
                carbs: 40,
                protein: 10,
                sugar: 5,
              },
              {
                img: 'https://img.freepik.com/free-photo/grilled-sandwich-with-bacon-fried-egg-tomato-lettuce-served-wooden-cutting-board_1150-42571.jpg?size=626&ext=jpg&ga=GA1.2.143797289.1685691440&semt=sph',
                name: 'Sandwich',
                cal: 170,
                carbs: 40,
                protein: 10,
                sugar: 5,
              },
            ],
            Lunch: [],
            Snack: [],
            Dinner: [],
          },
        ],
        [
          {
            img: 'https://cdn.pixabay.com/photo/2020/09/10/15/23/sunset-5560658_640.jpg',
            name: 'Volleyball',
            duration: 60,
            calories: 300,
            rep: 1,
          },
          { img: '', name: 'Walking', duration: 15, calories: 60, rep: 2 },
        ],
        [
          {
            calTotal: 2400,
            proteinTotal: 40,
            carbsTotal: 34,
            sugarTotal: 13,
          },
        ],
      ],
      '8-6-2023': [
        [
          {
            Breakfast: [
              {
                img: 'https://img.freepik.com/premium-photo/masala-dosa-is-south-indian-meal-served-with-sambhar-coconut-chutney-selective-focus_466689-22933.jpg?size=626&ext=jpg&ga=GA1.2.738037006.1685704227&semt=sph',
                name: 'Poha',
                cal: 170,
                carbs: 40,
                protein: 10,
                sugar: 5,
              },
              {
                img: 'https://img.freepik.com/free-photo/grilled-sandwich-with-bacon-fried-egg-tomato-lettuce-served-wooden-cutting-board_1150-42571.jpg?size=626&ext=jpg&ga=GA1.2.143797289.1685691440&semt=sph',
                name: 'Tea',
                cal: 170,
                carbs: 40,
                protein: 10,
                sugar: 5,
              },
            ],
            Lunch: [],
            Snack: [],
            Dinner: [],
          },
        ],
        [
          {
            img: 'https://cdn.pixabay.com/photo/2020/09/10/15/23/sunset-5560658_640.jpg',
            name: 'Volleyball',
            duration: 60,
            calories: 300,
            rep: 1,
          },
          { img: '', name: 'Walking', duration: 15, calories: 60, rep: 2 },
        ],
        [
          {
            calTotal: 2400,
            proteinTotal: 40,
            carbsTotal: 34,
            sugarTotal: 13,
          },
        ],
      ],
    })
  }, [])
  const [userData, setUserData] = useState({})
  return (
    <div className="page">
      {window.innerWidth >= 500 ? (
        load === true ? (
          <div>{console.log('Loading')}Loading...</div>
        ) : (
          <div className="main">
            {/* <Navbar /> */}
            <div className="display">
              <div id="upper">
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  Hello, {firstName} ! &#x1F44B;
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'rgba(182, 186, 187, 1)',
                  }}
                >
                  Welcome let's become the version of you today!
                </div>
              </div>
              <div id="lower">
                <div id="left-low">
                  {/* Steps to be Done : 
                            1.When fetching data I would create a loading page effect during that time fetch this particular user's data for this entire month 
                            2.whenever the user switches the month in the calendar load that months data and when fetched create a map where key would be date and value would be [[meals],[exercise],[total days's calculation]]*/}
                  <div className="meals" id="breakfast">
                    <div id="lab">Breakfast :</div>
                    <div className="cards">
                      {userData[currdate][0][0]['Breakfast'].map(
                        (item, index) => {
                          return (
                            <div className="card">
                              <div id="food-img">
                                <img src={item.img} alt=""></img>
                              </div>
                              <div id="food-info">
                                <div
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <div>{item.name}</div>
                                </div>
                                <div>Calories: {item.cal}</div>
                                <div>Protein: {item.protein}</div>
                                <div>Carbs: {item.carbs}</div>
                                <div>Sugar: {item.sugar}</div>
                              </div>
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>
                  <hr
                    style={{
                      background: 'lime',
                      color: 'lime',
                      borderColor: 'lime',
                      height: '3px',
                      width: '20vw',
                      marginLeft: '15%',
                    }}
                  />
                  <div className="meals" id="lunch">
                    <div id="lab">Lunch :</div>
                    <div className="cards">
                      {userData[currdate][0][0]['Breakfast'].map((item) => {
                        // console.log(item.img)
                        return (
                          <div className="card">
                            <div id="food-img">
                              <img src={item.img} alt=""></img>
                            </div>
                            <div id="food-info">
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}
                              >
                                <div>{item.name}</div>
                              </div>
                              <div>Calories: {item.cal}</div>
                              <div>Protein: {item.protein}</div>
                              <div>Carbs: {item.carbs}</div>
                              <div>Sugar: {item.sugar}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <hr
                    style={{
                      background: 'lime',
                      color: 'lime',
                      borderColor: 'lime',
                      height: '3px',
                      width: '20vw',
                      marginLeft: '15%',
                    }}
                  />
                  <div className="meals" id="snack">
                    <div id="lab">Snack :</div>
                    <div className="cards">
                      {userData[currdate][0][0]['Breakfast'].map((item) => {
                        // console.log(item.img)
                        return (
                          <div classNamecard>
                            <div id="food-img">
                              <img src={item.img} alt=""></img>
                            </div>
                            <div id="food-info">
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}
                              >
                                <div>{item.name}</div>
                              </div>
                              <div>Calories: {item.cal}</div>
                              <div>Protein: {item.protein}</div>
                              <div>Carbs: {item.carbs}</div>
                              <div>Sugar: {item.sugar}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <hr
                    style={{
                      background: 'lime',
                      color: 'lime',
                      borderColor: 'lime',
                      height: '3px',
                      width: '20vw',
                      marginLeft: '15%',
                    }}
                  />
                  <div className="meals" id="dinner">
                    <div id="lab">Dinner :</div>
                    <div className="cards">
                      {userData[currdate][0][0]['Breakfast'].map((item) => {
                        // console.log(item.img)
                        return (
                          <div className="card">
                            <div id="food-img">
                              <img src={item.img} alt=""></img>
                            </div>
                            <div id="food-info">
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}
                              >
                                <div>{item.name}</div>
                              </div>
                              <div>Calories: {item.cal}</div>
                              <div>Protein: {item.protein}</div>
                              <div>Carbs: {item.carbs}</div>
                              <div>Sugar: {item.sugar}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div id="right-low">
                  <div>Total :</div>
                  <div id="total-data">
                    <div className="total-cards" id="total-cal-in">
                      <div className="name-card">Calorie-In:</div>
                      <CircularProgressbar value={60} text={`${40} / ${500}`} />
                    </div>
                    <div className="total-cards" id="total-cal-out">
                      <div className="name-card">Calories-Out:</div>
                      <CircularProgressbar value={60} text={`${40} / ${500}`} />
                    </div>
                    <div className="total-cards" id="total-protein">
                      <div className="name-card">Protein:</div>
                      <CircularProgressbar value={60} text={`${40} / ${500}`} />
                    </div>
                    <div className="total-cards" id="total-sugar">
                      <div className="name-card">Sugar:</div>
                      <CircularProgressbar value={60} text={`${40} / ${500}`} />
                    </div>
                  </div>
                  <div id="workout">
                    <div>Workout :</div>
                    {userData[currdate][1].map((item, index) => {
                      return (
                        <div className="card1">
                          <div id="exercise-img">
                            <img src={item.img} alt=""></img>
                          </div>
                          <div id="exercise-info">
                            <div
                              style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                              }}
                            >
                              <div>{item.name}</div>
                            </div>
                            <div>Calories: {item.calories}</div>
                            <div>Duration : {item.duration}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="profile">
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
                {/* <img src={gender === 'male' ? male[ind] : female[ind]} alt=""></img> */}
                <img
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                  alt=""
                ></img>
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
                  {name}
                </div>
              </div>
              <div id="calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    id="wrap-cal"
                    orientation="portrait"
                    slots={{
                      day: (props) => {
                        // console.log(props)
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
          </div>
        )
      ) : (
        <>Repsonsive</>
      )}
    </div>
  )
}

export default Home
