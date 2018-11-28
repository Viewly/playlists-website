import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AvatarEditor from "react-avatar-editor";

import Modal from "../modal";
import { CLOSE_LOGIN_MODAL } from "../../actions/user";

@withRouter
@connect((state) => ({
  modal: state.modals.upload,
  user: state.user,
}), (dispatch) => ({
  closeModal: () => dispatch({ type: CLOSE_LOGIN_MODAL, data: { name: "upload" } }),
}))
class UploadModal extends Component {
  static propTypes = {
    modal: PropTypes.object,
    user: PropTypes.object,
    closeModal: PropTypes.func,
    location: PropTypes.object
  }

  state = {
    newImage: ""
  }

  componentDidUpdate(prevProps) {
    const { closeModal, location } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      closeModal();
    }
  }

  handleNewImage = e => {
    this.setState({ newImage: e.target.files[0] });
  }

  onClickSave = () => {
    if (this.editor) {
      const canvas = this.editor.getImage();

      console.log("canvas", canvas);
      canvas.toBlob((blob) => {
        console.log("blobbed", blob);
      });
    }
  }

  render() {
    const { modal, closeModal } = this.props;

    return (
      <Modal isOpen={modal.isOpen} title="Upload" onClose={() => closeModal()}>
        {this.state.newImage && (
          <div>
            <AvatarEditor
              ref={(ref) => this.editor = ref}
              image={this.state.newImage}
              width={200}
              height={200}
              borderRadius={100}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1}
              rotate={0}
            />

            <div>
              <button onClick={this.onClickSave}>Save</button>
              <button onClick={() => this.setState({ newImage: "" })}>Reset</button>
            </div>
          </div>
        )}

        {!this.state.newImage && (
          <div>
            New image:
            <input name="newImage" type="file" onChange={this.handleNewImage} />
          </div>
        )}
      </Modal>
    );
  }
}
export default UploadModal;
