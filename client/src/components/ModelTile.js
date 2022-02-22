import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const imageUrl2 =
  "https://i.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU";

const ModelTile = (props) => {
  const urn = props.urn
  const name = props.name
  
  useEffect(() => {
  }, [])
  return (
    <Link to={`/model/${urn}`}>
      <li>{name}</li>
    </Link>
  )
}

export default ModelTile