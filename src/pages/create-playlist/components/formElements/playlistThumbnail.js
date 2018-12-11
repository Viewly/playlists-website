import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import { getUploadUrl, uploadFile } from "../../../../actions/upload";
import { THUMBNAIL_ROOT } from "../../../../constants";

@connect(null, (dispatch) => ({
  getUploadUrl: (key, type) => dispatch(getUploadUrl({ key, type })),
  uploadFile: (url, data, callback) => dispatch(uploadFile({ url, data, callback })),
}))
export default class PlaylistThumbnail extends Component {
  state = {
    selectedFile: null,
    uploading: false,
    percentage: 0,
  }

  onUpload = async () => {
    const { getUploadUrl, uploadFile, onChange } = this.props;

    const thumbnail_extension = this.state.selectedFile.name.split(".").pop();
    const thumbnail_name = `${uuid()}_profile_avatar.${thumbnail_extension}`;
    const response = await getUploadUrl(thumbnail_name, thumbnail_extension);

    this.setState({ uploading: true, percentage: 0 });

    if (response.url) {
      await uploadFile(response.url, this.state.selectedFile, (percentage) => {
        console.log('perc', percentage);
        this.setState({ percentage });
      });

      // const thumbnail_url = S3_endpoint + "/" + thumbnail_name;
      this.setState({ uploading: false });
      onChange(thumbnail_name);
    } else {
      console.log("wtf");
    }
  }

  handleSelectedFile = (event) => {
    if (event.target.files[0]) {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      }, () => {
        this.onUpload();
      });
    }
  }

  render() {
    const { playlist_thumbnail_url } = this.props;

    return (
      <li>
        <label className='c-form__label'>Playlist thumbnail</label>
        <label className='c-file-input o-ratio o-ratio--16:9'>
          <div className='c-file-input__container o-ratio__content'>
            <input className='c-file-input__input' type="file" id="file" onChange={this.handleSelectedFile} />
            <div className='c-file-input__content'>
              <img className='c-file-input__graphic' src={require("../../../../images/graphic-add-photo.svg")}/>
              <p>Drag and drop or <span>browse</span> <br/>for the thumbnail to upload</p>
              <small className='c-file-input__annotation'>JPG, GIF or PNG. Max size 5mb</small>
            </div>
          </div>
          {this.state.uploading && <span className='c-file-input__upload-progress' style={{ width: `${this.state.percentage}%` }}/>}

          {playlist_thumbnail_url && <img alt='' className='o-ratio__content' src={`${THUMBNAIL_ROOT}/${playlist_thumbnail_url}`} />}
        </label>
      </li>
    );
  }
}
