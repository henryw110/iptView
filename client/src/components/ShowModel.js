import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import ForgeViewer from "../ForgeViewer";
const {
  launchViewer,
  onDocumentLoadFailure,
  onDocumentLoadSuccess,
  getForgeToken
} = ForgeViewer

const ShowModel = (props) => {
  const [response, setResponse] = useState({})
  const getModelData = async () => {
    setResponse(await (await fetch(`/api/v1/modelData/${params.id}`)).json())
  }
  const params = useParams()
  launchViewer(response.id)


  useEffect(() => {
    getModelData()


  }, [])

  return (
    <div>
      
      {
        response.user && response.createdAt ?
        <div>
          <div id="forgeViewer" />
          <div id="forgeText">
            <p>uploaded on {response.createdAt}</p>
            <a href ={`/user/`+response.user}>uploaded by {response.user} </a>
          </div> 
          </div>:
          <div />}
    </div>
  )
}
export default ShowModel