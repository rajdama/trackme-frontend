import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './Navbar'
import {
  createMealPlan,
  deleteMeal,
  foodInfo,
  getMealPlan,
  mealPlanExists,
  updateMealPlan,
} from '../actions/user_actions'
import '../css/mealPlanner.css'
import 'react-circular-progressbar/dist/styles.css'
import Layout from './common/Layout'

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

  const handleOnDelete = (periodIndex, mealIndex) => {
    dispatch(
      deleteMeal(auth.user.$id, currentDate, periodIndex, mealIndex, token)
    )
    setTimeout(() => {
      dispatch(getMealPlan(auth.user.$id, currentDate, token))
    }, 2000)
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
        //div id = "Main"tain
        if (item.calories < 500 || item.calories > 2500) {
          item = {
            ...item,
            warning:
              'Calories are not in the range for div id = "Main"taining weight',
          }
        }
      }
      setSelectedFood(item)
    }
  }, [user.selectedFood])

  return (
    <Layout id="meal">
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
      <div id="upper-meal">
        <div id="up-left-meal">
          <h3>Today's Diet</h3>

          <div id="date">
            <div>{weekday[date.getDay()]}</div>
            <div>
              {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
            </div>
          </div>
        </div>
        <div id="up-right-meal">
          {/* {nutrients.map((period, index) => {
              period.
              return (
                <>
                  <div className="progress-track-meal" id="calorie">
                    <div>Calories:</div>
                    <CircularProgressbar
                      value={calorie / nutrients.bre}
                      text={`${calorie} / ${maxcal}`}
                    />
                  </div>
                  <div className="progress-track-meal" id="carbs">
                    <div>Carbs:</div>
                    <CircularProgressbar value={66} text={`${66}%`} />
                  </div>
                  <div className="progress-track-meal" id="protein">
                    <div>Protein:</div>
                    <CircularProgressbar value={66} text={`${66}%`} />
                  </div>
                  <div className="progress-track-meal" id="period">
                    <div>Sugar:</div>
                    <CircularProgressbar value={66} text={`${66}%`} />
                  </div>
                </>
              )
            })} */}
        </div>
      </div>
      <div id="lower-meal">
        <div id="container">
          {mealPlan.map((meal, index) => {
            nutrients[index].calorie = 0
            nutrients[index].sugar = 0
            nutrients[index].carbs = 0
            nutrients[index].protein = 0
            return (
              <>
                <div
                  className="meals-mealplan"
                  id={`${periods[index].toLowerCase()}`}
                >
                  <div className="lab">{periods[index]}</div>
                  <div
                    onClick={async () => {
                      setPeriodTime(index)
                    }}
                    className="cards-mealplan"
                  >
                    {meal.length !== 0 &&
                      meal.map((item, index2) => {
                        nutrients[index].calorie =
                          nutrients[index].calorie + Math.round(item.calories)

                        nutrients[index].sugar =
                          nutrients[index].sugar + Math.round(item.sugar_g)

                        nutrients[index].carbs =
                          nutrients[index].carbs +
                          Math.round(item.carbohydrates_total_g)

                        nutrients[index].protein =
                          nutrients[index].protein + Math.round(item.protein_g)

                        return (
                          <div className="Card-mealplan">
                            <div id="food-img">
                              <img
                                onClick={() => {
                                  window.open(
                                    `https://www.youtube.com/results?search_query=${item.name} reciepe`
                                  )
                                }}
                                src={item.image}
                                alt=""
                              ></img>
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
                                <img
                                  onClick={() => {
                                    handleOnDelete(index, index2)
                                  }}
                                  style={{
                                    marginTop: 7,
                                    marginLeft: 20,
                                    height: 15,
                                    width: 15,
                                  }}
                                  src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
                                  alt=""
                                ></img>
                              </div>
                              <div>
                                Serving Size: {Math.round(item.serving_size_g)}
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
                          </div>
                        )
                      })}

                    <div className="add">
                      <img
                        onClick={() => {
                          openSearch()
                        }}
                        src="https://img.icons8.com/?size=1x&id=110229&format=png"
                        alt=""
                      ></img>
                    </div>
                  </div>
                  <div className="macro">
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
    </Layout>
  )
}

export default Mealplanner
