import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import ModelTile from "./ModelTile"



const ModelList = (props) => {
  const params = useParams()
  const [models, setModels] = useState([])

  const getModels = async () => {
    let response = []
    if (params.id === "all") {
      response = await fetch("/api/v1/listModels/all")
    }
    else {
      response = await fetch("/api/v1/listModels/" + params.id)
    }
    const modelsList = await response.json()
    console.log(modelsList)
    setModels(modelsList.map((model, index, array) => {
      if (index % 4 === 0) {
        return (
          <div className="grid-x grid-margin-x" key={parseInt(index / 4)}>
            <div className="small-3 cell">
              < ModelTile
                data={array[index]}
              />
            </div>
            {
              array[index + 1] ?
                <div className="small-3 cell">
                  < ModelTile
                    data={array[index + 1]}
                  />
                </div> :
                <div />}
            {
              array[index + 2] ?
                <div className="small-3 cell">
                  < ModelTile
                    data={array[index + 2]}
                  />
                </div> :
                <div />}
            {
              array[index + 3] ?
                <div className="small-3 cell">
                  < ModelTile
                    data={array[index + 3]}
                  />
                </div> :
                <div />}

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

      {
        params.id != "all" ?
          <h1 className = "title">{params.id}'s models</h1> :
          <div />
      }
      <ol>
        {models}
      </ol>
    </div>
  )
}

export default ModelList