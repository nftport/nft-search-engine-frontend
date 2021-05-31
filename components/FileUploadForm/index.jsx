import React from "react";
import DragAndDrop from "./DragAndDrop";
import "./FileUploadForm.css";

class FileUploadForm extends React.Component {

  state = {}

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value) {
      this.props.handleSubmit(this.state.value)
    }
  }

  handleChange = event => {
    this.state.value = event.target.value
  }

  handleFileUpload = event => {
    if (event?.target?.files?.length) {
      this.props.handleFileUpload(event.target.files[0])
    }
  }

  handleDrop = files => {
    if (files.length && files[0].name) {
      this.props.handleFileUpload(files[0])
    }
  }

  render() {
    return <div className={this.props.resultsPage ? "file-upload apercupro-medium-black-16px" : "file-upload file-upload-main apercupro-medium-black-16px"}>
      <div className="file-upload-half file-upload-half-left">
        <DragAndDrop handleDrop={this.handleDrop}>
          <label className={this.props.resultsPage ? "drag-and-drop-label center-vertically" : "drag-and-drop-label drag-and-drop-label-results center-vertically"}>
            <span className="file-upload-button">Select a file</span>
            or drag it here
            <input type="file" name="file" className="file-upload-input center-vertically"
                   onChange={this.handleFileUpload}
                   style={{display: "none"}}/>
          </label>
        </DragAndDrop>
      </div>

      <div className="file-upload-half file-upload-half-right center-vertically">
        <form className="file-upload-url-form" onSubmit={this.handleSubmit}>
          <div className="search-components search-components-url">
            <div className={this.props.resultsPage ? "search-box search-box-url-results": "search-box search-box-url-main"}>
              <img className="search-icon" src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
              <input
                className="search-all-nfts"
                placeholder="Search by image URL"
                value={this.state.value} onChange={this.handleChange}
              />
            </div>
            <input type="submit" value="Search" className="button search apercupro-medium-white-20px"/>
          </div>
        </form>
      </div>

    </div>;
  }
}

export default FileUploadForm;
