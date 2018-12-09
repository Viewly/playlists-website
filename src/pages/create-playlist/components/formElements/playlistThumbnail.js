import React from "react";

const PlaylistThumbnail = ({ value, categories, onChange }) => (
  <li>
    <label className='c-form__label'>Playlist thumbnail</label>
    <label className='c-file-input o-ratio o-ratio--16:9'>
      <div className='c-file-input__container o-ratio__content'>
        <input className='c-file-input__input' type="file" id="file" />
        <div className='c-file-input__content'>
          <img className='c-file-input__graphic' src={require("../../../../images/graphic-add-photo.png")} />
          <p>Drag and drop or <span>browse</span> <br />for the thumbnail to upload</p>
          <small className='c-file-input__annotation'>JPG, GIF or PNG. Max size 5mb</small>
        </div>
      </div>
      <span className='c-file-input__upload-progress' style={{ width: '55%' }} />
      {/*<img className='o-ratio__content' src='https://media.vidflow.io/upload/26940115-7c11-0dcf-34de-f2e52566c7bf_thumbnail.jpg' />*/}
    </label>
  </li>
);

export default PlaylistThumbnail;
