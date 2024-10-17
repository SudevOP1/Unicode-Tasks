import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = () => {

  let [healthDetail, setHealthDetail] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)

  useEffect(() => {
    getHealthDetail()
  }, [])

  let getHealthDetail = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/health-details/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      }
    })
    let data = await response.json()

    if(response.status === 200) {
      setHealthDetail(data)
    } else if(response.statusText === "Unauthorized") {
      logoutUser()
    }
  }

  return (
    <div>
      <h1>HomePage</h1>
      <ul>
        {healthDetail.map(detail => (
          <li key={detail.id}>{detail.weight}</li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage