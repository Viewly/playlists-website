import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cropper from 'react-cropper';

import Modal from "../modal";
import { CLOSE_LOGIN_MODAL } from "../../actions/user";

const ASPECT_RATIO = 16/9;

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

  ready = () => {
    const { modal } = this.props;

    const canvasData = this.ref.cropper.getCanvasData();
    const containerData = this.ref.cropper.getContainerData();
    const aspectRatio = modal.aspectRatio || ASPECT_RATIO;

    if (canvasData.naturalWidth/canvasData.naturalHeight > aspectRatio) {
      const cropperWidth = aspectRatio * canvasData.height;

      this.ref.cropper.setCropBoxData({
        height: canvasData.height,
        top: canvasData.top,
        left: containerData.width/2 - cropperWidth / 2
      });
    } else {
      const cropperHeight = canvasData.width / aspectRatio;

      this.ref.cropper.setCropBoxData({
        width: canvasData.width,
        top: containerData.height/2 - cropperHeight/2,
        left: canvasData.left
      });
    }
  }

  render() {
    const { modal, closeModal } = this.props;

    return (
      <Modal isOpen={modal.isOpen} showClose={false}>
        <Cropper
          ref={(ref) => this.ref = window.cropper = ref}
          src={modal.thumbnail_url}
          style={{height: 400, width: '100%'}}
          aspectRatio={modal.aspectRatio || ASPECT_RATIO}
          viewMode={1}
          ready={this.ready}
          guides={false} />

        <div className="u-text-right u-margin-top">
          <button className="c-btn c-btn--plain u-margin-right" onClick={closeModal}>Cancel</button>
          <button className="c-btn c-btn--secondary" onClick={this.saveCroppedImage}>Upload</button>
        </div>
      </Modal>
    );
  }
}
export default CropModal;
