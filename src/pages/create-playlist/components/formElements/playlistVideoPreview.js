import React from "react";

const PlaylistVideoPreview = ({ id, title, thumbnail_url, onDelete }) => (
  <li>
    <div className='c-video-link-preview'>
      <div className='o-grid o-grid--auto o-grid--nowrap o-grid--middle o-grid--small'>

        <div className='o-grid__cell'>
          <div className='c-faux-link'>
            <img className='o-icon o-icon--small' src={require("../../../../" +
              "images/icons/reorder.svg")}/>
          </div>
        </div>
        <div className='o-grid__cell o-grid__cell--grow'>
          <div className='o-grid o-grid--small o-grid--auto o-grid--nowrap o-grid--middle'>
            <div className='o-grid__cell u-1/3'>
                <span className='o-ratio o-ratio--16:9'>
                  <img className='c-video-link-preview__thumbnail o-ratio__content' src={thumbnail_url} />
                </span>
            </div>
            <div className='o-grid__cell u-2/3'>
              <input
                className='c-input c-input--primary c-input--small'
                type="text"
                name=""
                value={title}
                readOnly/>
            </div>
          </div>
        </div>
        <div className='o-grid__cell'>
          <div className='c-faux-link'>
            <img onClick={onDelete(id)} className='o-icon o-icon--small' src={require("../../../../images/icons/delete.svg")}/>
          </div>
        </div>
      </div>
    </div>
  </li>
);

export default PlaylistVideoPreview;
