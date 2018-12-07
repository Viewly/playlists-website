import React, { Component } from "react";
import { connect } from "react-redux";
import { userProfileUpdate } from "../../../actions/user";
import { getUploadUrl, uploadFile } from "../../../actions/upload";
import uuid from "uuid";

const S3_endpoint = "https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload";

@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  getUploadUrl: (key, type) => dispatch(getUploadUrl({ key, type })),
  userProfileUpdate: (data) => dispatch(userProfileUpdate(data)),
  uploadFile: (url, data, callback) => dispatch(uploadFile({ url, data, callback }))
}))
class UserAvatar extends Component {

  state = {
    selectedFile: null,
    uploading: false,
    percentage: 0,
  }

  onUpload = async () => {
    const { updateAvatar, userProfileUpdate, getUploadUrl, uploadFile } = this.props;

    const avatar_extension = this.state.selectedFile.name.split(".").pop();
    const avatar_name = `${uuid()}_profile_avatar.${avatar_extension}`;
    const response = await getUploadUrl(avatar_name, avatar_extension);

    this.setState({ uploading: true, percentage: 0 });

    if (response.url) {
      await uploadFile(response.url, this.state.selectedFile, (percentage) => {
        console.log('percentage', percentage);
        this.setState({ percentage });
      });

      await userProfileUpdate({ avatar_url: S3_endpoint + "/" + avatar_name });
      this.setState({ uploading: false });
      updateAvatar(S3_endpoint + "/" + avatar_name); //temporary hack
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
    const { avatar_url } = this.props;

    return (

      <div className='o-flag'>
        <div className='o-flag__img'>
          {avatar_url && <img className='o-avatar o-avatar--huge' src={avatar_url}/>}
          {!avatar_url &&
          <img className='o-avatar o-avatar--huge' src={require("../../../images/avatar-default.jpg")}/>}
        </div>
        <div className='o-flag__body'>
          <input style={{ visibility: 'hidden', width: 0, height: 0 }} ref={(ref) => this.fileInput = ref} type="file" onChange={this.handleSelectedFile} />

          <button
            className='c-btn c-btn--secondary c-btn--hollow c-btn--small c-btn--padding-small u-margin-bottom-tiny'
            onClick={() => this.fileInput.click()}>
            {this.state.uploading && <>Uploading {this.state.percentage}%</>}
            {!this.state.uploading && <>Change image</>}
          </button>
          <p className='c-annotation c-inline-message c-inline-message--error'>JPG, GIF or PNG. Max size of 800KB</p>
        </div>
      </div>

    );
  }
}

export default UserAvatar;
