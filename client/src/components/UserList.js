import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import { useParams } from "react-router"
import ModelTile from "./ModelTile"

const UserList = props => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const response = await (await fetch("/api/v1/listUsers")).json()
    console.log(response)
    const usersArray = (response.map((item, index) => {
      return (
        <div className="cell" key={index}>
          <Link to={`/user/${item}`}>
            <div className="blue" >  {item} </div>
          </Link>
        </div>

      )
    }))
    setUsers(usersArray)
  }

  useEffect(() => {
    getUsers()
  }, [])
  console.log(users)
  return (
    <div>
      <h1 className="title">User Index</h1>
    <div className="container">
      <div className="center">
        <h4>Click on a user's name to view their uploaded models!</h4>
        <ol>
          {users}
        </ol>
      </div>
    </div>
    </div>
  )


}
export default UserList