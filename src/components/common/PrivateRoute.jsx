import React from 'react'
import { Navigate } from 'react-router-dom'

function Privateroute({ component: Component }) {
  const token = localStorage.getItem('token')
  if (token) {
    return <Component />
  } else {
    return <Navigate to="/signin" />
  }
}

export default Privateroute
