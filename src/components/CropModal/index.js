import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cropper from 'react-cropper';

import Modal from "../modal";
import { CLOSE_LOGIN_MODAL } from "../../actions/user";

@connect((state) => ({
  modal: state.modals.crop,
  playlist: state.playlist
}), (dispatch) => ({
  closeModal: () => dispatch({ type: CLOSE_LOGIN_MODAL, data: { name: "crop" } }),
}))
class CropModal extends Component {
  static propTypes = {
    modal: PropTypes.object,
    closeModal: PropTypes.func
  }

  saveCroppedImage = () => {
    const { modal, closeModal } = this.props;

    this.ref.getCroppedCanvas().toBlob((data) => modal.callback(data));
    closeModal();
  }

  render() {
    const { modal } = this.props;

    return (
      <Modal isOpen={modal.isOpen} showClose={false}>
        <Cropper
          ref={(ref) => this.ref = ref}
          src={modal.thumbnail_url}
          style={{height: 400, width: '100%'}}
          aspectRatio={16 / 9}
          guides={false} />

        <div className="u-text-right u-margin-top">
          <button className="c-btn c-btn--secondary" onClick={this.saveCroppedImage}>Upload</button>
        </div>
      </Modal>
    );
  }
}
export default CropModal;
