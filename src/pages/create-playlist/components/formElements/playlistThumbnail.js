import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import Dropzone from "react-dropzone";

import { getUploadUrl, uploadFile } from "../../../../actions/upload";
import { THUMBNAIL_ROOT } from "../../../../constants";
import { OPEN_LOGIN_MODAL } from "../../../../actions/user";

@connect(null, (dispatch) => ({
  getUploadUrl: (key, type) => dispatch(getUploadUrl({ key, type })),
  uploadFile: (url, data, callback) => dispatch(uploadFile({ url, data, callback })),
  openCropModal: (thumbnail_url, callback) => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "crop", thumbnail_url, callback } })
}))
export default class PlaylistThumbnail extends Component {
  state = {
    selectedFile: null,
    uploading: false,
    percentage: 0,
  }

  onUpload = async (croppedImageURL) => {
    const { getUploadUrl, uploadFile, onChange } = this.props;

    const thumbnail_extension = this.state.selectedFile.name.split(".").pop();
    const thumbnail_name = `${uuid()}_thumbnail.${thumbnail_extension}`;
    const response = await getUploadUrl(thumbnail_name, thumbnail_extension);

    this.setState({ uploading: true, percentage: 0 });

    if (response.url) {
      await uploadFile(response.url, croppedImageURL, (percentage) => {
        this.setState({ percentage });
      });

      this.setState({ uploading: false, selectedFile: null });
      onChange(thumbnail_name);
    } else {
      console.log("An error occurred", response);
    }
  }

  handleSelectedFile = (event) => {
    const { openCropModal } = this.props;
    const file = event.target.files[0];

    if (file) {
      this.setState({
        selectedFile: file,
        loaded: 0,
      }, () => {
        if (file) {
          let reader = new FileReader();
          reader.onload = (e) => {
            openCropModal(e.target.result, (cropped) => {
              this.onUpload(cropped);
            });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  onDrop = (files) => {
    this.handleSelectedFile({ target: { files } });
  }

  render() {
    const { playlist_thumbnail_url } = this.props;

    return (
      <li>

        <label className='c-form__label'>Playlist thumbnail</label>
        <div className='c-file-input o-ratio o-ratio--16:9'>
          <Dropzone
            onDrop={this.onDrop}
            accept="image/*"
            multiple={false}
          >
            {({getRootProps, getInputProps, isDragActive }) => (
              <>
                {playlist_thumbnail_url && <img alt='' className='c-file-input__uploaded-img o-ratio__content' src={`${THUMBNAIL_ROOT}/${playlist_thumbnail_url}`} />}
                <div {...getRootProps()} className={`c-file-input__container o-ratio__content ${isDragActive ? 'is-drag-and-drop-target' : ''}`}>
                  <input {...getInputProps()}  className='c-file-input__input' type="file" id="file" />
                  <div className='c-file-input__content'>
                    <img alt='' className='c-file-input__graphic' src={require("../../../../images/graphic-add-photo.svg")}/>
                    <p>Drag and drop or <span>browse</span> <br/>for the thumbnail to upload</p>
                    <small className='c-file-input__annotation'>JPG, GIF or PNG. Max size 5mb</small>
                  </div>
                </div>
                {this.state.uploading && <span className='c-file-input__upload-progress' style={{ width: `${this.state.percentage}%` }}/>}
              </>
            )}
          </Dropzone>


        </div>
      </li>
    );
  }
}
