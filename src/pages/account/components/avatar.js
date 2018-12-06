import React, { Component } from "react";
import { connect } from "react-redux";
import { OPEN_LOGIN_MODAL } from "../../../actions/user";
import { getUploadUrl, uploadFile } from "../../../actions/upload";

@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  openLoginModal: () => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "upload" } }),
  getUploadUrl: (key, type) => dispatch(getUploadUrl({ key, type })),
  uploadFile: (url, data) => dispatch(uploadFile({ url, data }))
}))
class UserAvatar extends Component {

  state = {
    selectedFile: null
  }

  onUpload = async () => {
    const { getUploadUrl, uploadFile } = this.props;

    const response = await getUploadUrl("test", "jpg");

    if (response.url) {
      const data = new FormData();
      data.append("file", this.state.selectedFile, this.state.selectedFile.name)

      const resp = await uploadFile(response.url, data);
      console.log("resp", resp);
      // axios
      //   .post(endpoint, data, {
      //     onUploadProgress: ProgressEvent => {
      //       this.setState({
      //         loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
      //       })
      //     },
      //   })
      //   .then(res => {
      //     console.log(res.statusText)
      //   })

    } else {
      console.log("wtf");
    }
  }

  handleSelectedFile = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  render() {
    const { avatar_url, openLoginModal } = this.props;

    return (

      <div className='o-flag'>
        <div className='o-flag__img'>
          {avatar_url && <img className='o-avatar o-avatar--huge' src={avatar_url}/>}
          {!avatar_url &&
          <img className='o-avatar o-avatar--huge' src={require("../../../images/avatar-default.jpg")}/>}
        </div>
        <div className='o-flag__body'>
          <input type="file" onChange={this.handleSelectedFile} />
          <button
            className='c-btn c-btn--secondary c-btn--hollow c-btn--small c-btn--padding-small u-margin-bottom-tiny'
            onClick={() => openLoginModal()}>Change image
          </button>
          <button
            className='c-btn c-btn--secondary c-btn--hollow c-btn--small c-btn--padding-small u-margin-bottom-tiny'
            onClick={() => this.onUpload()}>UPLOAD
          </button>
          <p className='c-annotation c-inline-message c-inline-message--error'>JPG, GIF or PNG. Max size of 800KB</p>
        </div>
      </div>

    );
  }
}

export default UserAvatar;
