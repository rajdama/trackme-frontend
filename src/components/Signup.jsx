import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { signup } from '../actions'
import Quotes from './common/Quotes'
import '../css/Auth.css'

function SignUpForm() {
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  if (auth.authenticate) {
    console.log(auth.authenticate)
    return <Navigate to={'/'} />
  }

  const userSignUp = (e) => {
    e.preventDefault()
    const user = {
      firstName: firstname,
      lastName: lastname,
      email,
      password,
    }
    dispatch(signup(user))
    setfirstname('')
    setlastname('')
    setemail('')
    setpassword('')
  }

  return (
    <div className="appAside">
      <Quotes />
      <div className="appForm">
        <div className="pageSwitcher">
          <NavLink
            to="/signin"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign In
          </NavLink>
          <NavLink
            exact
            to="/signup"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign Up
          </NavLink>
        </div>

        <div className="formCenter">
          <form className="formFields">
            <div className="formField">
              <label className="formFieldLabel" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                id="firstName"
                className="formFieldInput"
                placeholder="Enter your first name"
                name="firstName"
                onInput={(e) => {
                  setfirstname(e.target.value)
                }}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                value={lastname}
                id="lastName"
                className="formFieldInput"
                placeholder="Enter your last name"
                name="lastName"
                onInput={(e) => {
                  setlastname(e.target.value)
                }}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                value={password}
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                onInput={(e) => {
                  setpassword(e.target.value)
                }}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                value={email}
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                onInput={(e) => {
                  setemail(e.target.value)
                }}
              />
            </div>

            <div className="formField">
              <button onClick={userSignUp} className="formFieldButton">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
