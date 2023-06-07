import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './Navbar'
import { CircularProgressbar } from 'react-circular-progressbar'
import { foodList } from '../actions/user_actions'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../css/mealPlanner.css'
// import "react-circular-progressbar/dist/styles.css";

function Mealplanner() {
  //states for storing the total nutrients for the day
  const [calorie, setcalories] = useState(0)
  // Go to the component SignupWeightGoal there I have set the cookie named "calcnt"
  const maxcal = 5
  const [protein, setprotein] = useState(0)
  const [carbs, setcarbs] = useState(0)
  const [sugar, setsugar] = useState(0)
  //We will store the added food items in the respective arrays which is declared for breakfast,lunch,snack,dinnner
  const [breakfastItems, setBreakfastItems] = useState([
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
  ])
  const [lunchItems, setlunchItems] = useState([])
  const [snackItems, setsnackItems] = useState([])
  const [dinnerItems, setdinnerItems] = useState([])
  const [selectedFood, setSelectedFood] = useState({})
  const dispatch = useDispatch()

  let items

  const openSearch = () => {
    document.getElementById('myOverlay').style.display = 'block'
  }
  const closeSearch = () => {
    document.getElementById('myOverlay').style.display = 'none'
  }

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    if (string != '') {
      dispatch(foodList(string))
    }
    // setFoodTitle(string)
  }

  const handleOnSelect = (item) => {
    // if (user.target == "gain") {
    //   if (item.calories < 600) {
    //     item = { ...item, warning: "Calories are too low" };
    //   }
    // }
    // if (user.target == "lose") {
    //   if (item.calories > 600) {
    //     item = { ...item, warning: "Calories are too high" };
    //   }
    // }
    // if (user.target == "maintain") {
    //   if (item.calories < 600 || item.calories > 700) {
    //     item = {
    //       ...item,
    //       warning: "Calories are not in the range for maintaining weight",
    //     };
    //   }
    // }
    // item = { ...item, title: item.name, calories: Math.round(item.calories) };

    setSelectedFood({ ...item })
    // the item selected
  }

  setTimeout(() => {
    console.log(selectedFood)
  }, 10000)

  const handleOnClear = () => {
    // setSelectedFood({})
  }

  const user = useSelector((state) => state.user)

  if (user.message) {
    items = user.message.hits.map((item, i) => {
      return {
        id: i,
        name: item.recipe.label,
        image: item.recipe.image,
        calories: item.recipe.calories,
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
                  <button
                    className="my-5"
                    onClick={() => {
                      // dispatch(
                      //   occupiedCells({
                      //     cell: selectedCell,
                      //     food: selectedFood,
                      //   })
                      // );
                      // window.location.reload();
                    }}
                    style={{ height: '50px', borderRadius: '15px' }}
                  >
                    Save
                  </button>
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
                value={calorie / maxcal}
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
            <div className="progress-track" id="sugar">
              <div>Sugar:</div>
              <CircularProgressbar value={66} text={`${66}%`} />
            </div>
          </div>
        </div>
        <div id="lower">
          <div id="container">
            <div className="meals" id="breakfast">
              <div id="lab">Breakfast :</div>
              <div className="cards">
                {breakfastItems.map((item) => {
                  // console.log(item.img)
                  return (
                    <Card>
                      <div id="food-img">
                        <img src={item.img} alt=""></img>
                      </div>
                      <div id="food-info">
                        <div>{item.name}</div>
                        <div>Calories: {item.cal}</div>
                        <div>Protein: {item.protein}</div>
                        <div>Carbs: {item.carbs}</div>
                        <div>Sugar: {item.sugar}</div>
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
                <div>
                  Total Calories :{' '}
                  {/* Add here the total calories for breakfast*/}
                </div>
                <div>
                  Total Protein :{' '}
                  {/* Add here the total protein for breakfast*/}
                </div>
                <div>
                  Total Carbs : {/* Add here the total carbs for breakfast*/}
                </div>
                <div>
                  Total Sugar : {/* Add here the total sugar for breakfast*/}
                </div>
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
            <div className="meals" id="lunch">
              <div id="lab">Lunch :</div>
              <div className="cards">
                {breakfastItems.map((item) => {
                  return (
                    <Card>
                      <div id="food-img">
                        <img src={item.img} alt=""></img>
                      </div>
                      <div id="food-info">
                        <div>{item.name}</div>
                        <div>Calories: {item.cal}</div>
                        <div>Protein: {item.protein}</div>
                        <div>Carbs: {item.carbs}</div>
                        <div>Sugar: {item.sugar}</div>
                      </div>
                    </Card>
                  )
                })}
                <div id="add">
                  <img
                    src="https://img.icons8.com/?size=1x&id=110229&format=png"
                    alt=""
                  ></img>
                </div>
              </div>
              <div id="macro">
                <div>
                  Total Calories :{' '}
                  {/* Add here the total calories for breakfast*/}
                </div>
                <div>
                  Total Protein :{' '}
                  {/* Add here the total protein for breakfast*/}
                </div>
                <div>
                  Total Carbs : {/* Add here the total carbs for breakfast*/}
                </div>
                <div>
                  Total Sugar : {/* Add here the total sugar for breakfast*/}
                </div>
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
            <div className="meals" id="snack">
              <div id="lab">Snack :</div>
              <div className="cards">
                {breakfastItems.map((item) => {
                  return (
                    <Card>
                      <div id="food-img">
                        <img src={item.img} alt=""></img>
                      </div>
                      <div id="food-info">
                        <div>{item.name}</div>
                        <div>Calories: {item.cal}</div>
                        <div>Protein: {item.protein}</div>
                        <div>Carbs: {item.carbs}</div>
                        <div>Sugar: {item.sugar}</div>
                      </div>
                    </Card>
                  )
                })}
                <div id="add">
                  <img
                    src="https://img.icons8.com/?size=1x&id=110229&format=png"
                    alt=""
                  ></img>
                </div>
              </div>
              <div id="macro">
                <div>
                  Total Calories :{' '}
                  {/* Add here the total calories for breakfast*/}
                </div>
                <div>
                  Total Protein :{' '}
                  {/* Add here the total protein for breakfast*/}
                </div>
                <div>
                  Total Carbs : {/* Add here the total carbs for breakfast*/}
                </div>
                <div>
                  Total Sugar : {/* Add here the total sugar for breakfast*/}
                </div>
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
            <div className="meals" id="dinner">
              <div id="lab">Dinner :</div>
              <div className="cards">
                {breakfastItems.map((item) => {
                  return (
                    <Card>
                      <div id="food-img">
                        <img src={item.img} alt=""></img>
                      </div>
                      <div id="food-info">
                        <div>{item.name}</div>
                        <div>Calories: {item.cal}</div>
                        <div>Protein: {item.protein}</div>
                        <div>Carbs: {item.carbs}</div>
                        <div>Sugar: {item.sugar}</div>
                      </div>
                    </Card>
                  )
                })}
                <div id="add">
                  <img
                    src="https://img.icons8.com/?size=1x&id=110229&format=png"
                    alt=""
                  ></img>
                </div>
              </div>
              <div id="macro">
                <div>
                  Total Calories :{' '}
                  {/* Add here the total calories for breakfast*/}
                </div>
                <div>
                  Total Protein :{' '}
                  {/* Add here the total protein for breakfast*/}
                </div>
                <div>
                  Total Carbs : {/* Add here the total carbs for breakfast*/}
                </div>
                <div>
                  Total Sugar : {/* Add here the total sugar for breakfast*/}
                </div>
              </div>
            </div>
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
