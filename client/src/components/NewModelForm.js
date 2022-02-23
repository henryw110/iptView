import React, { useState, useEffect } from "react"
import axios from "axios"


const NewModelForm = (props) => {
  const [selectedFile, setSelectedFile] = useState(null)
  // On file select (from the pop up)
  const onFileChange = event => {
    // Update the state
    setSelectedFile(event.target.files[0] );
  };
  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );
    // Details of the uploaded file
    console.log(selectedFile);
    // Request made to the backend api
    // Send formData object
    axios.post("api/v1/uploadfile", formData);
  };

  return (
    <div>
      {(props.user) ?
        <div>
          Hello!
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>
            Upload!
          </button>
        </div> :
        <div></div>}
    </div>
  )
}

export default NewModelForm