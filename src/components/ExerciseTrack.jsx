import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './Navbar'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  createExcercisePlan,
  excercisePlanExists,
  getExcerciseCalories,
  getExcerciseImage,
  getExcercisePlan,
  updateExcercisePlan,
} from '../actions/user_actions'
import { useEffect } from 'react'

function ExerciseTrack({ token }) {
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
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)

  const [show, setShow] = useState(false)
  const [exercises, setExercises] = useState([])
  const [addExcercise, setAddExcercise] = useState(false)

  const [exercise, setExercise] = useState('')
  useEffect(() => {
    dispatch(getExcercisePlan(auth.user.$id, currentDate, token))
    dispatch(excercisePlanExists(auth.user.$id, currentDate, token))
    // setExercises([...user.excercisePlan])
  }, [])

  useEffect(() => {
    console.log(Object.keys(user.excerciseInfo).length)
    console.log(addExcercise)
    if (addExcercise) {
      if (user.excercisePlanExist) {
        dispatch(
          updateExcercisePlan(
            {
              name: exercise,
              calories: user?.excerciseInfo?.exercises[0]?.nf_calories,
              duration: user?.excerciseInfo?.exercises[0]?.duration_min,
              image: user.image.webformatURL,
            },
            auth.user.$id,
            currentDate,
            token
          )
        )
      } else {
        if (Object.keys(user.excerciseInfo).length !== 0) {
          dispatch(
            createExcercisePlan(
              {
                name: exercise,
                calories: user.excerciseInfo.exercises[0].nf_calories,
                duration: user.excerciseInfo.exercises[0].duration_min,
                image: user.image.webformatURL,
              },
              auth.user.$id,
              currentDate,
              token
            )
          )
        }
      }
    }
    setAddExcercise(false)
  }, [user.excerciseInfo, addExcercise])

  useEffect(() => {
    dispatch(excercisePlanExists(auth.user.$id, currentDate, token))
  }, [user.excercisePlan])

  useEffect(() => {
    setExercises([...user.excercisePlan])
  }, [user.excercisePlan])

  return (
    <Page>
      <Main>
        <Navbar />
        <Content>
          <div id="upper">
            <div id="up-left">
              <h3>Today's Activity</h3>
              <div id="date">
                <div>{weekday[date.getDay()]}</div>
                <div>
                  {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
                </div>
              </div>
            </div>
            <div id="up-right">
              <div className="progress-track" id="calorie">
                <div id="cal-burn">Calories Burned:</div>
                <CircularProgressbar value={60} text={`${40} / ${500}`} />
              </div>
            </div>
          </div>
          <div id="lower">
            <div id="left-low">
              {exercises.map((item, index) => {
                return (
                  <Card>
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
                      <div>Calories: {item.calories}</div>
                      <div>Duration : {item.duration}</div>
                    </div>
                  </Card>
                )
              })}
            </div>
            <div id="right-low">
              <div id="search">
                <input
                  onChange={(e) => {
                    setExercise(e.target.value)
                  }}
                  type="text"
                  placeholder="Add exercise"
                ></input>
                <button
                  type="submit"
                  onClick={() => {
                    setShow(true)
                    dispatch(getExcerciseImage(exercise))
                  }}
                >
                  Add
                </button>
              </div>
              {show ? (
                <div id="search-info">
                  <img
                    style={{ borderRadius: '5px' }}
                    id="search-img"
                    src={user.image.webformatURL}
                    alt=""
                  />

                  <div className="search-inp">
                    <div>Duration In Mins :</div>{' '}
                    <input
                      type="number"
                      onChange={(e) => {
                        dispatch(getExcerciseCalories(exercise, e.target.value))
                      }}
                    ></input>
                  </div>
                  <button
                    id="add"
                    style={{
                      width: '60%',
                      height: '5vh',
                      marginTop: '2vh',
                      borderRadius: 10,
                      backgroundColor: 'lightgreen',
                    }}
                    onClick={() => {
                      setAddExcercise(true)
                    }}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Content>
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
  width: 100vw;
  display: flex;
  flex-direction: row;
`
const Content = styled.div`
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
  .progress-track {
    display: flex;
    flex-direction: row;
    height: 12vh;
    width: 20vw;
    margin-left: 50vw;
    margin-top: 1vh;
    justify-content: center;
  }
  #cal-burn {
    margin-top: 10%;
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
  #lower {
    height: 85%;
    width: 100%;
    background-color: rgba(253, 251, 249, 1);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  #left-low {
    height: 90%;
    width: 55%;
    background-color: #dadada;
    margin-right: 2vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  #right-low {
    height: 90%;
    width: 25%;
    background-color: #dadada;
  }
  #search {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    input {
      width: 60%;
      margin-right: 5px;
      border-radius: 4px;
    }
    button {
      width: 20%;
    }
  }
  #search-img {
    width: 80%;
    height: 30vh;
  }
  .search-inp {
    width: 80%;
    margin-top: 3vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .search-inp > input {
    width: 50px;
    margin-left: auto;
    margin-right: 50%;
  }
  #search-info {
    color: black;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #add:hover {
    transform: scale(1.1);
  }
`
const Card = styled.div`
  height: 30%;
  width: 20vw;
  display: flex;
  flex-direction: row;
  color: black;
  font-size: 14px;
  border: 2px solid black;
  #exercise-img {
    height: 100%;
  }
  #exercise-img > img {
    height: 100%;
    width: 11vw;
  }
  border-radius: 10px;
  margin-top: 2vh;
  margin-right: 10px;
  #exercise-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5px;
  }
  #exercise-info div:first-child {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`
export default ExerciseTrack
