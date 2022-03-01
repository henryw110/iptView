import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const ModelTile = (props) => {
  const [imgData,setImgData] = useState()
  const urn = props.urn
  const name = props.name
  const bucket = props.bucket
  const getThumbnail = async() =>{

    const response =await fetch(`/api/v1/thumbnail/${urn}`)
    const buffer=(await response.json())
    const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer.data)));
    setImgData(base64String)

  }

  useEffect(() => {
    getThumbnail()
  }, [])
  return (
    <Link to={`/model/${urn}`}>
      {imgData?
      <div>
      <img src={`data:image/png;base64,${imgData}`} alt=""/>
      <p>{name}</p>
      </div>:
      <p>waiting for {name}</p>}
    </Link>
  )
}

export default ModelTile