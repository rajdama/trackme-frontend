import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, login } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Quotes from './common/Quotes'
import '../css/Auth.css'

function SignInForm() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [])

  if (auth.authenticate) {
    if (auth.user?.prefs?.goal) {
      return <Navigate to={'/'} />
    } else {
      return <Navigate to={'/info'} />
    }
  }

  const userLogin = (e) => {
    e.preventDefault()
    const user = {
      email,
      password,
    }
    setemail('')
    setpassword('')
    dispatch(login(user))
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
                onChange={(e) => {
                  setemail(e.target.value)
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
                onChange={(e) => {
                  setpassword(e.target.value)
                }}
              />
            </div>

            <div className="formField">
              <button
                className="formFieldButton"
                onClick={(e) => {
                  userLogin(e)
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
