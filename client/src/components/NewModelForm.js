import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";



const NewModelForm = (props) => {
  console.log("new model")
  const [userEmail, setUserEmai] = useState()

  const [selectedFile, setSelectedFile] = useState(null)
  if (props.user && userEmail != props.user.email) {
    setUserEmai(props.user.email)
  }

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = async () => {

    console.log(userEmail)
    // Create an object of formData
    const formData = new FormData();
    formData.append('fileToUpload', selectedFile);
    formData.append('userEmail', userEmail);
    try {
      const response = await fetch(`/api/v1/uploadFile`, {
        method: 'POST',
        headers: new Headers({

        }),
        body: formData
      })
      window.location.href = "/user/all"
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }

  }

  return (
    <div>
      <h1 className="title"> Upload Model </h1>
    <div className="container">
      <div className="center newModelForm">
        {(props.user) ?
          <div>
            Upload a .ipt file!
            <input type="file" onChange={onFileChange} />
            <button className="button centerText" onClick={onFileUpload}>
              Upload!
            </button>
          </div> :
          <div></div>}
      </div>
    </div>
    </div>
  )
}

export default NewModelForm