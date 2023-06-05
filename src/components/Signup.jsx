import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { signup } from "../actions";

import "../css/Auth.css";

function SignUpForm() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [quotes, setquotes] = useState({});
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchquotes = () => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((response) => {
        setquotes(response[getRndInteger(0, 1200)]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchquotes();
  }, []);

  if (auth.authenticate) {
    console.log(auth.authenticate);
    return <Navigate to={"/"} />;
  }

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const userSignUp = (e) => {
    e.preventDefault();
    const user = {
      firstName: firstname,
      lastName: lastname,
      email,
      password,
    };
    dispatch(signup(user));
  };

  return (
    <div className="appAside">
      <div className="quotes">
        <div id="say">{quotes["text"]}</div>
        <div id="aname">- {quotes["author"]}</div>
      </div>
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
                id="firstName"
                className="formFieldInput"
                placeholder="Enter your first name"
                name="firstName"
                onInput={(e) => {
                  setfirstname(e.target.value);
                }}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="formFieldInput"
                placeholder="Enter your last name"
                name="lastName"
                onInput={(e) => {
                  setlastname(e.target.value);
                }}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                onInput={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                onInput={(e) => {
                  setemail(e.target.value);
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
  );
}

export default SignUpForm;
