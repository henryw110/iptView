import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import ModelTile from "./ModelTile"

const UserList = props => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const response = await (await fetch("/api/v1/listUsers")).json()
    console.log(response)
    const usersArray = (response.map((item, index) => {
      return (
          <div className=" cell">
            <a key={index} href={`http://localhost:8080/user/` + item}> {item} </a>
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
    <div className="container">
      <div className="center">
        <h4>Click on a user's name to view their uploaded models!</h4>
        <ol>
          {users}
        </ol>
      </div>
    </div>
  )


}
export default UserList