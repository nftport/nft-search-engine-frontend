import React from "react";
import DragAndDrop from "./DragAndDrop";
import "./FileUploadForm.css";

class FileUploadForm extends React.Component {

  state = {
    value: ""
  }

  componentDidMount() {
    if (this.props.urlValue) {
      this.setState({value: this.props.urlValue})
    }
  }

  handleUrlChange = event => {
    this.setState({value: event.target.value});
    this.props.handleQueryChange(event);
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value) {
      this.props.handleSubmit(this.state.value)
    }
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
    return <div
      className={this.props.resultsPage ? "file-upload apercupro-medium-black-16px" : "file-upload file-upload-main apercupro-medium-black-16px"}>
      <div className={this.props.searchType === "counterfeit" ? "file-upload-half file-upload-half-left" : "file-upload"}>
        <DragAndDrop handleDrop={this.handleDrop}>
          <label
            className={this.props.resultsPage ? "drag-and-drop-label center-vertically" : "drag-and-drop-label drag-and-drop-label-results center-vertically"}>
            <span className="file-upload-button">Select a file</span>
            or drag it here
            <input type="file" name="file" className="file-upload-input center-vertically"
                   onChange={this.handleFileUpload}
                   style={{display: "none"}}/>
          </label>
        </DragAndDrop>
      </div>
      {this.props.searchType === "counterfeit" &&
      <div className="file-upload-half file-upload-half-right center-vertically">
        <form className="file-upload-url-form" onSubmit={this.handleSubmit}>
          <div className="search-components search-components-url">
            <div
              className={this.props.resultsPage ? "search-box search-box-url-results" : "search-box search-box-url-main"}>
              <img className="search-icon" src="https://storage.googleapis.com/nft-search/img/search-icon%402x.svg"/>
              <input
                className={this.props.resultsPage ? "search-all-nfts-results" : "search-all-nfts"}
                placeholder="Enter image URL"
                value={this.state.value} onChange={this.handleUrlChange}
              />
            </div>
          </div>
        </form>
      </div>
      }


    </div>;
  }
}

export default FileUploadForm;
