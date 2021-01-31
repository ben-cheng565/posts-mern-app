import React, { Component } from "react";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

import "./fileUpload.css";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
    };
  }

  //check the type of files
  checkMimeType = (event) => {
    let file = event.target.files[0];
    let err = "";
    const types = ["image/jpeg", "image/png", "image/gif"];

    if (types.every((type) => file.type !== type)) {
      err = file.type + " is not a supported format\n";
    }

    // for (let e = 0; e < err.length; e++) {
    //   toast.warn(err[e]);
    // }
    if (err.length !== 0) {
      event.target.value = null;
      return false;
    }
    return true;
  };

  //check the size of files
  checkFileSize = (event) => {
    let file = event.target.files[0];
    let err = "";
    const fileLimit = 1024 * 1024 * 5;

    if (file.size > fileLimit) {
      err = "The size of " + file.name + " is too big!\n";
    }

    // for (let e = 0; e < err.length; e++) {
    //   toast.warn(err[e]);
    // }
    if (err.length !== 0) {
      event.target.value = null;

      return false;
    }
    return true;
  };

  onChangeHandler = (event) => {
    if (this.checkMimeType(event) && this.checkFileSize(event)) {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      });
    }

    const data = new FormData();
    data.append("file", event.target.files[0]);

    axios
      .post("https://post-app-backend.herokuapp.com/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        // toast.success("Upload succeffully!");
        this.props.setFilePath(res.data.filePath);
      })
      .catch((err) => {
        console.log("Upload failed!");
      });
  };

  render() {
    return (
      <>
        <div className="container">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={this.onChangeHandler}
          />

          <div className="load-progress">
            <LinearProgress variant="determinate" value={this.state.loaded} />
          </div>
        </div>
      </>
    );
  }
}

export default FileUpload;
