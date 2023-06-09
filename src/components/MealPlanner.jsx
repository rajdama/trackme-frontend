import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './Navbar'
import { CircularProgressbar } from 'react-circular-progressbar'
import {
  createMealPlan,
  foodList,
  getMealPlan,
  mealPlanExists,
  updateMealPlan,
} from '../actions/user_actions'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import '../css/mealPlanner.css'
// import "react-circular-progressbar/dist/styles.css";

function Mealplanner() {
  let nutrients = [{}, {}, {}, {}]

  const [period, setperiod] = useState(0)
  // let mealPlan = [[], [], [], []]
  const [mealPlan, setMealPlan] = useState([[], [], [], []])
  const [loading, setLoading] = useState(false)
  const [selectedFood, setSelectedFood] = useState({})

  const setPeriodTime = async (val) => {
    await setperiod(val)
  }

  //We will store the added food items in the respective arrays which is declared for breakfast,lunch,snack,dinnner

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMealPlan(auth.user.$id))
    if (user.message.length === 0) {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      setMealPlan([...user.message])
    }
  }, [])

  const periods = ['Breakfast', 'Lunch', 'Snacks', 'Dinner']

  let items

  const openSearch = () => {
    document.getElementById('myOverlay').style.display = 'block'
  }
  const closeSearch = () => {
    document.getElementById('myOverlay').style.display = 'none'
  }

  const handleOnSearch = (string, results) => {
    if (string !== '') {
      dispatch(foodList(string))
    }
  }

  const handleOnSave = () => {
    console.log(user.exists)
    dispatch(mealPlanExists(auth.user.$id))
    console.log(user.exists)
    if (user.exists) {
      dispatch(updateMealPlan(selectedFood, period, auth.user.$id))
    } else {
      dispatch(createMealPlan(selectedFood, period, auth.user.$id))
    }
    document.getElementById('save').style.display = 'none'
    document.getElementById('saving').style.display = 'block'
    if (!user.loading) {
      document.getElementById('save').style.display = 'block'
      document.getElementById('saving').style.display = 'none'
    }
  }

  const auth = useSelector((state) => state.auth)
  const handleOnSelect = (item) => {
    setSelectedFood({ ...item })
  }

  const handleOnClear = () => {}

  const user = useSelector((state) => state.user)

  if (user.selectedFood?.hits) {
    items = user.selectedFood.hits.map((item, i) => {
      return {
        name: item.recipe.label,
        image: item.recipe.image,
        calories: Math.round(item.recipe.calories),
        protein: Math.round(item.recipe.digest[2].total),
        carbs: Math.round(item.recipe.digest[1].total),
        sugar: Math.round(item.recipe.totalNutrients.SUGAR.quantity),
      }
    })
  }

  // code for the date part in the up-left id div
  const date = new Date()
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return (
    <Page>
      <Navbar />
      <div id="myOverlay" className="overlay">
        <span className="closebtn" onClick={closeSearch} title="Close Overlay">
          ×
        </span>
        <div className="overlay-content">
          <form>
            <ReactSearchAutocomplete
              items={items}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              onClear={handleOnClear}
              autoFocus
              // formatResult={formatResult}
            />
          </form>
          <p>form</p>
          {selectedFood.name && (
            <>
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
                  <>
                    {user.loading ? (
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
                    ) : (
                      <p id="saving" style={{ color: 'wheat' }}>
                        saving
                      </p>
                    )}
                  </>
                )}
              </div>
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
                {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
              </div>
            </div>
          </div>
          <div id="up-right">
            <div className="progress-track" id="calorie">
              <div>Calories:</div>
              <CircularProgressbar
              // value={calorie / maxcal}
              // text={`${calorie} / ${maxcal}`}
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
          </div>
        </div>
        <div id="lower">
          <div id="container">
            {!user.loading ? (
              mealPlan.length === 4 &&
              mealPlan.map((meal, index) => {
                nutrients[index].calorie = 0
                nutrients[index].sugar = 0
                nutrients[index].carbs = 0
                nutrients[index].protein = 0
                return (
                  <>
                    {console.log(user)}
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
                              nutrients[index].calorie + item.calories

                            nutrients[index].sugar =
                              nutrients[index].sugar + item.sugar

                            nutrients[index].carbs =
                              nutrients[index].carbs + item.carbs

                            nutrients[index].protein =
                              nutrients[index].protein + item.protein

                            return (
                              <Card>
                                <div id="food-img">
                                  <img src={item.image} alt=""></img>
                                </div>
                                <div id="food-info">
                                  <div>{item.name}</div>
                                  <div>Calories: {item.calories}</div>
                                  <div>Protein: {item.protein}</div>
                                  <div>Carbs: {item.carbs}</div>
                                  <div>Sugar: {item.sugar}</div>
                                </div>
                              </Card>
                            )
                          })}
                        {console.log(nutrients)}
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
              })
            ) : (
              <div>{console.log(user)}Loading...</div>
            )}
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
