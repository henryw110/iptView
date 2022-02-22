import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Routem,useParams } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import ForgeViewer from "../ForgeViewer";
const {
  launchViewer,
  onDocumentLoadFailure,
  onDocumentLoadSuccess,
  getForgeToken
} = ForgeViewer

const ShowModel = (props) => {
  const params = useParams()
  useEffect(() => {
    launchViewer(params.id)
  }, [])

  return <div id="forgeViewer"></div>
}
export default ShowModel