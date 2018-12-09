import React from "react";

const PlaylistAddVideos = ({ value, onChange }) => (
  <li>
    <label className='c-form__label'>Add videos</label>
    <div className='o-flag o-flag--reverse'>
      <div className='o-flag__img'>
        <button className='c-btn c-btn--secondary c-btn--square'>
          <img className='o-icon o-icon--small' src={require("../../../../images/icons/plus.svg")}/>
        </button>
      </div>
      <div className='o-flag__body'>
        <input
          className='c-input c-input--primary'
          type="text"
          name=""
          value=""
          readOnly/>
      </div>
    </div>
    <small className='c-form__annotation'>Copy video URL and paste it here</small>
  </li>
);

export default PlaylistAddVideos;
