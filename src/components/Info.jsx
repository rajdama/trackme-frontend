import { useDispatch, useSelector } from 'react-redux'
import '../css/Info.css'
import logo from './trackme-logo-rmvback.png'
import { Navigate } from 'react-router-dom'
import { getUpdatedUser } from '../actions'

function Info({ token }) {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const setGoal = (goal) => {
    dispatch(getUpdatedUser(auth.user.$id, goal, token))
  }

  return !auth.user?.prefs?.goal ? (
    <div id="Info-Page">
      <div id="upper-info-page">
        <img src={logo} alt="" className="logo-website" />
      </div>
      <div id="lower-info-page">
        <div id="info-low-left">
          <form class="form">
            <p class="title">Details </p>
            <div class="flex">
              <label>
                <input
                  required=""
                  placeholder=""
                  type="text"
                  class="input"
                ></input>
                <span>Firstname</span>
              </label>

              <label>
                <input
                  required=""
                  placeholder=""
                  type="text"
                  class="input"
                ></input>
                <span>Lastname</span>
              </label>
            </div>

            <label>
              <input
                required=""
                placeholder=""
                type="email"
                class="input"
              ></input>
              <span>Email</span>
            </label>

            <label>
              <input
                required=""
                placeholder=""
                type="text"
                class="input"
              ></input>
              <span>Phone Number</span>
            </label>
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                class="input"
              ></input>
              <span>Height(in cm)</span>
            </label>
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                class="input"
              ></input>
              <span>Weight(in kg)</span>
            </label>
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                class="input"
              ></input>
              <span>Age(in years)</span>
            </label>
          </form>
        </div>
        <div id="info-low-right">
          <form class="form">
            <p class="title">Fitness Goal </p>
            <div id="fit-goal">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setGoal(1)
                }}
                className="fit-btn"
              >
                Weight Loss
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setGoal(2)
                }}
                className="fit-btn"
              >
                Weight Gain
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setGoal(3)
                }}
                className="fit-btn"
              >
                Maintain Weight
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  )
}

export default Info
