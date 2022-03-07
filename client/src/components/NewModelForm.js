import React, { useState, useEffect } from "react"



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
    console.log(selectedFile);

    for (var pair of formData.keys()) {
      console.log(pair);
    }
    for (var pair of formData.values()) {
      console.log(pair);
    }
    try {
      const response = await fetch(`/api/v1/uploadFile`, {
        method: 'POST',
        headers: new Headers({

        }),
        body: formData
      })
      console.log(response)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  return (
    <div className="container">
      <div className="center newModelForm">
        {(props.user) ?
          <div>
            Upload a .ipt file!
            <input type="file" onChange={onFileChange}/>
            <button className="button centerText" onClick={onFileUpload}>
              Upload!
            </button>
          </div> :
          <div></div>}
      </div>
    </div>
  )
}

export default NewModelForm