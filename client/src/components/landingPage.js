import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import ModelTile from "./ModelTile"

const landingPage = props => {
  return (
    <div className="grid-x">
      <h4>Welcome to iptView! Upload a model by clicking "Upload Model", view a list of models by clicking "View Models", or view a list of users by clicking "User Index"</h4>
    </div>
  )
}

export default landingPage