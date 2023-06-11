import React,{useState} from 'react'
import styled from 'styled-components';
import Navbar from './Navbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function ExerciseTrack() {
  //exercise done for the day
  const [show,setshow] = useState(false);
  const [exercises,setExercises] = useState(
    [{ "img" : "https://cdn.pixabay.com/photo/2020/09/10/15/23/sunset-5560658_640.jpg" ,
       "name" : "Volleyball" ,
       "duration" : 60,
       "calories" : 300,
       "rep": 1
     },
     { "img" : "" ,
       "name" : "Walking" ,
       "duration" : 15,
       "calories" : 60,
       "rep": 2
     }]
  );
  const [rep,setrep] = useState(0);
  const [dur,setdur] = useState(0);
  //Searched exercise info
  const [searchexercise,setsearchexercise] = useState(null);
  // code for the date part in the up-left id div 
  const date = new Date();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return (
    <Page>
        {
            window.innerWidth >= 500 ? 
            <Main>
              <Navbar />
              <Content>
              <div id="upper">
                <div id="up-left">
                  <h3>Today's Activity</h3>
                  <div id = "date">
                    <div>{weekday[date.getDay()]}</div> 
                    <div>{date.getDate()}-{date.getMonth()}-{date.getFullYear()}</div>
                  </div>
                </div>
                <div id="up-right">
                  <div className = "progress-track" id="calorie">
                    <div id = "cal-burn">
                      Calories Burned:
                    </div>
                    <CircularProgressbar value={60} text={`${40} / ${500}`} />
                  </div>
                </div>
              </div>
              <div id="lower">
                <div id="left-low">
                  {
                    exercises.map((item,index) => {
                      return (
                        <Card>
                          <div id="exercise-img">
                            <img src = {item.img} alt=""></img>
                          </div>
                          <div id="exercise-info">
                          <div style = {{
                              width: '100%',
                              display:'flex',
                              flexDirection:'row',
                              justifyContent: 'center',
                              }}>
                                <div>{item.name}</div>
                                <img onClick = {() => {
                                  setExercises(items =>{
                                    items = items.filter((i,ind) => ind !== index);
                                    return items;
                                  })
                                }} style = {{marginTop:7,marginLeft:5,height:15,width:15}} src = "https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt = ""></img>
                            </div>
                            <div>Calories: {item.calories}</div>
                            <div>Duration : {item.duration}</div>
                          </div>
                        </Card>
                      )
                    })
                  }
                </div>
                <div id="right-low">
                  <div id="search">
                    <input type='text' placeholder='search exercise'></input>
                    <button type='submit' onClick = {() => {
                      setsearchexercise({
                        "img":"https://cdn.pixabay.com/photo/2020/09/10/15/23/sunset-5560658_640.jpg",
                        "calburnperhour":300,
                        "name":"BeachBall"
                      });
                    }}>Search</button>
                  </div>
                  { searchexercise !== null ? <div id="search-info">
                    <div style={{fontSize:32,color:'black'}}>{searchexercise.name}</div>
                    <img id = "search-img" src={searchexercise.img} alt="" />
                    <div className='search-inp'>
                      <div>Reps :</div> <input type="number" onChange={(e) => setrep(e.target.value)}></input>
                    </div>
                    <div className='search-inp'>
                      <div>Duration :</div> <input type="number" onChange={(e) => setdur(e.target.value)}></input>
                    </div>
                    <div id="cal-burn">
                      Calories burnt : {400}
                    </div>
                    <button id="add" style={{width:'60%',
                      height:'5vh',
                      marginTop:'2vh',
                      borderRadius:10,
                      backgroundColor:'lightgreen'
                    }} onClick = {() => {
                      setExercises(item => [...item,{
                        "img":searchexercise.img,
                        "name":searchexercise.name,
                        "duration":dur,
                        "calories":searchexercise.calburnperhour*dur/60,
                        "rep":rep
                      }])
                    }}>
                      Add
                    </button>
                    </div> :
                     <></> }
                  </div>
              </div>
              </Content>
            </Main> 
            : 
            <>Repsonsive</>
        }
    </Page>
  )
}
const Page = styled.div`
  height: 100vh; width: 100vw;
  display: flex; flex-direction: row;
`;
const Main = styled.div`
  height: 100vh; width: 100vw;
  display: flex; flex-direction: row; 
`;
const Content = styled.div`
  height: 100vh; width: 95vw;
  #upper{
    height:15%; width:100%;
    display:flex; flex-direction:row;
    background-color:rgba(201, 213, 165, 1);
    color:black;
  }
  #up-left{
    height:100%; width:30%; display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    margin-left:5%;
  }
  .progress-track{
    display:flex; flex-direction:row;
    height:12vh; width:20vw;
    margin-left:50vw;
    margin-top:1vh;
    justify-content:center;
  }
  #cal-burn{
    margin-top:10%;
  }
  #date{
    display:flex; flex-direction:row;
    flex-wrap:wrap;
    justify-content:center;
  }
  #date > div{
    margin-right:5px;
  }
  #lower{
    height:85%; width:100%;
    background-color:rgba(253, 251, 249, 1); 
    display:flex; flex-direction:row;
    align-items:center; justify-content:center;
  }
  #left-low{
    height:90%; width:55%;
    background-color:#dadada;
    margin-right:2vw;
    display:flex; flex-direction:row; flex-wrap:wrap; justify-content:center;
    align-items:center;
  }
  #right-low{
    height:90%; width:25%;
    background-color:#dadada;
  }
  #search{
    width:100%;
    height:10%;
    display:flex; flex-direction:row; align-items:center;
    justify-content:center;
    input{
      width:60%;
      margin-right:5px;
      border-radius:4px;
    }
    button{
      width:20%;
    }
  }
  #search-img{
    width:80%;
    height:30vh;
  }
  .search-inp{
    width:80%; margin-top:3vh;
    display: flex; flex-direction: row; justify-content:flex-start;
  }
  .search-inp  > input{
    width:50px;
    margin-left:auto; margin-right:50%;
  }
  #search-info {
    color:black;
    width:100%;
    display: flex; flex-direction:column;
    align-items: center;
  }
  #add:hover{
    transform:scale(1.1);
  }
`;
const Card = styled.div`
  height:30%; width:20vw; display:flex; flex-direction:row; color:black;
  font-size:14px;
  border:2px solid black;
  #exercise-img{
    height:100%;
  }
  #exercise-img > img{
    height:100%; width:11vw;
  }
  border-radius:10px; margin-top:2vh; margin-right:10px; 
  #exercise-info{
    display:flex; flex-direction:column;
    align-items:flex-start; margin-left:5px;
  }
  #exercise-info div:first-child {
    font-size: 20px; font-weight: bold;
    margin-bottom: 5px;
  }
  &:hover{
    transform:scale(1.1);
    cursor:pointer;
  }
`;
export default ExerciseTrack