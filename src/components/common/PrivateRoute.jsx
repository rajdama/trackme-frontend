import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Privateroute({ component: Component }) {
  const token = localStorage.getItem('token')
  const user = useSelector((state) => state.user)

  if (token) {
    return <Component token={token} />
  } else {
    return <Navigate to="/signin" />
  }
}

export default Privateroute
