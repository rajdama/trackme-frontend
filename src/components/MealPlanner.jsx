import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './Navbar'
import {
  createMealPlan,
  foodInfo,
  getMealPlan,
  mealPlanExists,
  updateMealPlan,
} from '../actions/user_actions'
import '../css/mealPlanner.css'
import 'react-circular-progressbar/dist/styles.css'

function Mealplanner({ token }) {
  let nutrients = [{}, {}, {}, {}]
  const date = new Date()

  let currentDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const [period, setperiod] = useState(0)
  const [mealPlan, setMealPlan] = useState([[], [], [], []])
  const [addFood, setAddFood] = useState({ quantity: 1 })
  const [selectedFood, setSelectedFood] = useState()

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const user = useSelector((state) => state.user)

  const setPeriodTime = async (val) => {
    await setperiod(val)
  }

  useEffect(() => {
    dispatch(mealPlanExists(auth.user.$id, currentDate, token))
    dispatch(getMealPlan(auth.user.$id, currentDate, token))
    user.selectedFood = {}
  }, [])

  const periods = ['Breakfast', 'Lunch', 'Snacks', 'Dinner']

  const openSearch = () => {
    document.getElementById('myOverlay').style.display = 'block'
  }
  const closeSearch = () => {
    document.getElementById('myOverlay').style.display = 'none'
    user.selectedFood = {}
    setSelectedFood({})
  }

  const handleOnSave = () => {
    if (user.exists) {
      dispatch(
        updateMealPlan(selectedFood, period, auth.user.$id, currentDate, token)
      )
    } else {
      dispatch(
        createMealPlan(selectedFood, period, auth.user.$id, currentDate, token)
      )
      dispatch(mealPlanExists(auth.user.$id, currentDate, token))
    }
    setTimeout(() => {
      dispatch(getMealPlan(auth.user.$id, currentDate, token))
    }, 2000)
    setSelectedFood({})

    closeSearch()
  }

  useEffect(() => {
    if (user.mealPlan.length !== 0) {
      console.log(user.mealPlan)
      setMealPlan([...user.mealPlan])
    }
  }, [user.mealPlan])

  useEffect(() => {
    if (user.selectedFood?.name) {
      let item = user.selectedFood
      if (auth.user.prefs.goal === '1') {
        //loss

        if (item.calories > 2000) {
          item = {
            ...item,
            warning: 'Calories are too high',
          }
        }
      }
      if (auth.user.prefs.goal === '2') {
        //gain
        if (item.calories < 3000) {
          item = {
            ...item,
            warning: 'Calories are too low',
          }
        }
      }
      if (auth.user.prefs.goal === '3') {
        //maintain
        if (item.calories < 500 || item.calories > 2500) {
          item = {
            ...item,
            warning: 'Calories are not in the range for maintaining weight',
          }
        }
      }
      setSelectedFood(item)
    }
  }, [user.selectedFood])

  return (
    <Page>
      <Navbar />
      <div id="myOverlay" className="overlay">
        <span className="closebtn" onClick={closeSearch} title="Close Overlay">
          ×
        </span>
        <div className="overlay-content">
          <form>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <input
                style={{
                  padding: '15px',
                  fontSize: '17px',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '30px',
                  width: '80%',
                }}
                type="text"
                onChange={(e) => {
                  setAddFood({
                    ...addFood,
                    foodTitle: e.target.value,
                  })
                }}
              />

              <input
                style={{
                  padding: '15px',
                  fontSize: '17px',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '30px',
                  marginLeft: '10px',
                  width: '5%',
                }}
                type="text"
                onChange={(e) => {
                  setAddFood({ ...addFood, quantity: e.target.value })
                }}
                value={addFood.quantity}
              />

              <button
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(foodInfo(addFood.quantity, addFood.foodTitle))
                }}
                style={{
                  width: '5%',
                  borderRadius: '20px',
                  marginLeft: '20px',
                }}
              >
                Add
              </button>
            </div>
          </form>
          <p>.</p>
          {selectedFood?.name && (
            <>
              {!user.loading ? (
                <div
                  className="my-5"
                  style={{
                    display: 'flex',
                    marginRight: '30px',
                    marginLeft: '30px',
                    width: '80%',
                  }}
                >
                  <div className="searchresult">
                    <img
                      style={{ height: '19vh', width: '18vh' }}
                      src={selectedFood.image}
                      alt="img"
                    ></img>
                    <div className="detailsfood">
                      <p>{selectedFood.name}</p>
                      <p>carlories : {Math.round(selectedFood.calories)}</p>
                    </div>
                  </div>
                  {selectedFood.warning ? (
                    <div style={{ color: 'red' }}>{selectedFood.warning}</div>
                  ) : (
                    <button
                      className="my-5 "
                      id="save"
                      onClick={() => {
                        handleOnSave()
                      }}
                      style={{ height: '50px', borderRadius: '15px' }}
                    >
                      Save
                    </button>
                  )}
                </div>
              ) : (
                <p style={{ color: 'white' }}>loading...</p>
              )}
            </>
          )}
        </div>
      </div>
      <Main>
        <div id="upper">
          <div id="up-left">
            <h3>Today's Diet</h3>

            <div id="date">
              <div>{weekday[date.getDay()]}</div>
              <div>
                {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
              </div>
            </div>
          </div>
          <div id="up-right">
            {/* {nutrients.map((period, index) => {
              period.
              return (
                <>
                  <div className="progress-track" id="calorie">
                    <div>Calories:</div>
                    <CircularProgressbar
                      value={calorie / nutrients.bre}
                      text={`${calorie} / ${maxcal}`}
                    />
                  </div>
                  <div className="progress-track" id="carbs">
                    <div>Carbs:</div>
                    <CircularProgressbar value={66} text={`${66}%`} />
                  </div>
                  <div className="progress-track" id="protein">
                    <div>Protein:</div>
                    <CircularProgressbar value={66} text={`${66}%`} />
                  </div>
                  <div className="progress-track" id="period">
                    <div>Sugar:</div>
                    <CircularProgressbar value={66} text={`${66}%`} />
                  </div>
                </>
              )
            })} */}
          </div>
        </div>
        <div id="lower">
          <div id="container">
            {mealPlan.map((meal, index) => {
              nutrients[index].calorie = 0
              nutrients[index].sugar = 0
              nutrients[index].carbs = 0
              nutrients[index].protein = 0
              return (
                <>
                  <div className="meals" id="breakfast">
                    <div id="lab">{periods[index]}</div>
                    <div
                      onClick={async () => {
                        setPeriodTime(index)
                      }}
                      className="cards"
                    >
                      {meal.length !== 0 &&
                        meal.map((item) => {
                          nutrients[index].calorie =
                            nutrients[index].calorie + Math.round(item.calories)

                          nutrients[index].sugar =
                            nutrients[index].sugar + Math.round(item.sugar_g)

                          nutrients[index].carbs =
                            nutrients[index].carbs +
                            Math.round(item.carbohydrates_total_g)

                          nutrients[index].protein =
                            nutrients[index].protein +
                            Math.round(item.protein_g)

                          return (
                            <Card>
                              <div id="food-img">
                                <img src={item.image} alt=""></img>
                              </div>
                              <div id="food-info">
                                <div>{item.name}</div>
                                <div>
                                  Serving Size:{' '}
                                  {Math.round(item.serving_size_g)}
                                </div>
                                <div>Calories: {Math.round(item.calories)}</div>
                                <div>Protein: {Math.round(item.protein_g)}</div>
                                <div>
                                  Carbs:
                                  {Math.round(item.carbohydrates_total_g)}
                                </div>
                                <div>Sugar: {Math.round(item.sugar_g)}</div>
                                <div>Quantity: {Math.round(item.quantity)}</div>
                              </div>
                            </Card>
                          )
                        })}

                      <div id="add">
                        <img
                          onClick={() => {
                            openSearch()
                          }}
                          src="https://img.icons8.com/?size=1x&id=110229&format=png"
                          alt=""
                        ></img>
                      </div>
                    </div>
                    <div id="macro">
                      <div>Total Calories :{nutrients[index].calorie}</div>
                      <div>Total Protein :{nutrients[index].protein}</div>
                      <div>Total Carbs :{nutrients[index].carbs}</div>
                      <div>Total Sugar :{nutrients[index].sugar}</div>
                    </div>
                  </div>
                  <hr
                    style={{
                      background: 'lime',
                      color: 'lime',
                      borderColor: 'lime',
                      height: '3px',
                      width: '60vw',
                      marginLeft: '15%',
                    }}
                  />
                </>
              )
            })}
          </div>
        </div>
      </Main>
    </Page>
  )
}
const Page = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`
const Main = styled.div`
  height: 100vh;
  width: 95vw;
  #upper {
    height: 15%;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: rgba(201, 213, 165, 1);
    color: black;
  }
  #up-left {
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 5%;
  }
  #up-right {
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1vh;
  }
  #lower {
    height: 85%;
    width: 100%;
    background-color: rgba(253, 251, 249, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  #container {
    height: 90%;
    width: 90%;
    background-color: white;
    overflow: scroll;
  }
  #date {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  #date > div {
    margin-right: 5px;
  }
  .progress-track {
    height: 8vh;
    width: 8vh;
    margin-right: 2vw;
  }
  .meals {
    color: black;
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: row;
  }
  .cards {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  #lab {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  #macro {
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  #add > img {
    height: 50px;
    width: 50px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
  #add {
    margin-top: 5%;
  }
`
const Card = styled.div`
  height: 90%;
  width: 15vw;
  display: flex;
  flex-direction: row;
  color: black;
  font-size: 14px;
  #food-img {
    height: 100%;
    width: 50%;
  }
  #food-img > img {
    height: 100%;
    width: 100%;
  }
  border: 2px solid black;
  border-radius: 10px;
  margin-top: 2vh;
  margin-right: 10px;
  #food-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5px;
  }
  #food-info div:first-child {
    font-size: 20px;
    font-weight: bold;
  }
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`
export default Mealplanner
