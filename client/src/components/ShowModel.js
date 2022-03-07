import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, Link } from "react-router-dom";
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
  console.log(response)

  useEffect(() => {
    getModelData()
    getModelData()
    getModelData()

  }, [])

  return (
    <div>
      {
        response.user && response.createdAt ?
          <div className="forgeContainer">
            <div  id="forgeViewer"/>
              <h1 className="title"> viewing {response.text}</h1>
              <div className="title">
                <p>uploaded on {response.createdAt}</p>
                <Link to={`/user/` + response.user}>
                  <div className="blue">uploaded by {response.user} </div>
                </Link>
              </div>
            </div>:
          <div />}

    </div>
  )
}
export default ShowModel