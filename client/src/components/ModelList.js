import React, { useState, useEffect } from "react"
import ModelTile from "./ModelTile"



const ModelList = (props) => {
  const [models, setModels] = useState([])

  const getModels = async () => {
    const response = await fetch("/api/v1/listModels")
    const modelsList = await response.json()
    setModels(modelsList.map((model, index, array) => {
      if (index % 4 === 0) {
        return (
          <div className="grid-x" key = {parseInt(index/4)}>
            <div className="small-3 cell">
              < ModelTile
                urn={array[index].id}
                name={array[index].text}
              />
            </div>
            {
            array[index+1]?
            <div className="small-3 cell">
            < ModelTile
                urn={array[index+1].id}
                name={array[index+1].text}
              />
            </div>:
            <div/>}
            {
            array[index+2]?
            <div className="small-3 cell">
            < ModelTile
                urn={array[index+2].id}
                name={array[index+2].text}
              />
            </div>:
            <div/>}
            {
            array[index+3]?
            <div className="small-3 cell">
            < ModelTile
                urn={array[index+3].id}
                name={array[index+3].text}
              />
            </div>:
            <div/>}
            
          </div>


        )
      }

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