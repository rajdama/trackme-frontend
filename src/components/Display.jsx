import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { useSelector, useDispatch } from 'react-redux'
import 'react-circular-progressbar/dist/styles.css'
import { getExcercisePlan, getMealPlan } from '../actions/user_actions'
import { useEffect } from 'react'
import { useState } from 'react'

function Display({ currentDate }) {
  console.log(currentDate)
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const [mealPlan, setMealPlan] = useState([])
  const [excercisePlan, setExcercisePlan] = useState([])
  const periods = ['Breakfast', 'Lunch', 'Snacks', 'Dinner']
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExcercisePlan(auth.user.$id, currentDate))
    dispatch(getMealPlan(auth.user.$id, currentDate))
  }, [currentDate])

  useEffect(() => {
    setMealPlan([...user.mealPlan])
  }, [user.mealPlan])

  useEffect(() => {
    setExcercisePlan([...user.excercisePlan])
  }, [user.excercisePlan])
  return (
    <div id="Disp">
      <div id="upper">
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          Hello, Raj ! &#x1F44B;
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
          {mealPlan.map((meal, p) => {
            return (
              <>
                <div className="meals" id={`${periods[p].toLowerCase()}`}>
                  <div id="lab">{periods[p]}</div>
                  <div className="cards">
                    {meal.length &&
                      meal.map((item, q) => {
                        return (
                          <div key={q} id="Card-home-page">
                            <div id="food-img">
                              <img src={item.image} alt=""></img>
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
                              <div>Calories: {item.calories}</div>
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
                    width: '80%',
                    marginLeft: '15%',
                    marginTop: '5vh',
                  }}
                />
              </>
            )
          })}
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
            {excercisePlan.map((item, index) => {
              return (
                <div id="Card1-home">
                  <div id="exercise-img">
                    <img src={item.image} alt=""></img>
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
                    <div className="lower-card-info">
                      Calories: {item.calories}
                    </div>
                    <div className="lower-card-info">
                      Duration : {item.duration}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Display
