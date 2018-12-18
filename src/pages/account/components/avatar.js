import React, { Component } from "react";
import { connect } from "react-redux";
import { LOGIN_SUCCESS_PERSIST, OPEN_LOGIN_MODAL, userProfileUpdate } from "../../../actions/user";
import { getUploadUrl, uploadFile } from "../../../actions/upload";
import uuid from "uuid";
import { S3_ROOT } from "../../../constants";

@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  getUploadUrl: (key, type) => dispatch(getUploadUrl({ key, type })),
  userProfileUpdate: (data) => dispatch(userProfileUpdate(data)),
  uploadFile: (url, data, callback) => dispatch(uploadFile({ url, data, callback })),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data }),
  openCropModal: (thumbnail_url, callback) => dispatch({
    type: OPEN_LOGIN_MODAL,
    data: { name: "crop", thumbnail_url, callback, aspectRatio: 1 }
  })
}))
class UserAvatar extends Component {

  state = {
    selectedFile: null,
    uploading: false,
    percentage: 0,
    error: false,
    errorMessage: ""
  };

  onUpload = async (croppedImageURL) => {
    const { user, loginSuccess, onChange, userProfileUpdate, getUploadUrl, uploadFile } = this.props;

    const avatar_extension = this.state.selectedFile.name.split(".").pop();
    const avatar_name = `${uuid()}_profile_avatar.${avatar_extension}`;
    const response = await getUploadUrl(avatar_name, avatar_extension);
    const avatar_url = S3_ROOT + "/" + avatar_name;

    this.setState({ uploading: true, percentage: 0 });

    if (response.url) {
      await uploadFile(response.url, croppedImageURL, (percentage) => {
        console.log("percentage", percentage);
        this.setState({ percentage });
      });

      const newProfile = await userProfileUpdate({ ...user, avatar_url });
      this.setState({ uploading: false });

      if (newProfile.success) {
        loginSuccess(newProfile.user);
        onChange(avatar_url);
      } else {
        this.setState({ error: true, errorMessage: newProfile.message });
      }

    } else {
      console.log("wtf");
    }
  };

  handleSelectedFile = (event) => {
    const { openCropModal } = this.props;
    const file = event.target.files[0];

    if (file) {
      this.setState({
        selectedFile: file,
        loaded: 0,
        error: false
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
  };

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
          <input
            style={{ visibility: "hidden", width: 0, height: 0 }}
            ref={(ref) => this.fileInput = ref}
            type="file"
            onChange={this.handleSelectedFile} />

          <button
            className='c-btn c-btn--secondary c-btn--hollow c-btn--small c-btn--padding-small u-margin-bottom-tiny'
            onClick={() => this.fileInput.click()}>
            {this.state.uploading && <>Uploading {this.state.percentage}%</>}
            {!this.state.uploading && <>Change image</>}
          </button>
          {this.state.error &&
          <p className='c-annotation c-inline-message c-inline-message--error'>{this.state.errorMessage}</p>}
        </div>
      </div>

    );
  }
}

export default UserAvatar;
