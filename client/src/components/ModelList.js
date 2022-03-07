import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import ModelTile from "./ModelTile"



const ModelList = (props) => {
  const params = useParams()
  const [models, setModels] = useState([])
  console.log(params)

  const getModels = async () => {

    let response = []
    if (params.id) {
      console.log("fetching user")
      response = await fetch("/api/v1/listModels/" + params.id)
    }
    else {
      console.log("fetching all")
      response = await fetch("/api/v1/listModels/all")
    }

    const modelsList = await response.json()
    //console.log(modelsList)
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
  console.log(models)
  return (
    <div>
      {
        params.id ?
          <h1 className="title">Viewing {params.id}'s models</h1> :
          <h1 className="title">Viewing all models</h1> 
      }
      <ol>
        {models}
      </ol>
    </div>
  )
}

export default ModelList