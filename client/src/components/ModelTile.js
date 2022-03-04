import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const ModelTile = (props) => {
  const [imgData,setImgData] = useState()
  const urn = props.data.id
  const user = props.data.user
  const name = props.data.text
  const bucket = props.data.bucket
  const modelId = props.data.modelId
  const getThumbnail = async() =>{
    //console.log(props.data)
    

    const response =await fetch(`/api/v1/thumbnail/${urn}`)
    const buffer=(await response.json())
    const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer.data)));
    setImgData(base64String)

  }

  useEffect(() => {
    getThumbnail()
  }, [])
  return (
    <Link to={`/model/${modelId}`}>
      {imgData?
      <div>
      <img src={`data:image/png;base64,${imgData}`} alt=""/>
      <p>{name}</p>
      <p>Uploaded by {user} </p>
      </div>:
      <p>waiting for {name}</p>}
    </Link>
  )
}

export default ModelTile
