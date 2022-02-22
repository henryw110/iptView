import React, { useState, useEffect } from "react"
import ModelTile from "./ModelTile"



const ModelList = (props) => {
  const [models, setModels] = useState([])

  const getModels = async () => {
    const response = await fetch("/api/v1/listModels")
    const modelsList = await response.json()
    console.log(modelsList)
    setModels(modelsList.map((model, index) => {
      return (
        < ModelTile
          key={index}
          urn={model.id}
          name={model.text}
        />
      )
    }))
  }
  useEffect(() => {
    getModels()
  }, [])


  return (
    <div>
      <ol>
        {models}
      </ol>
    </div>
  )
}

export default ModelList