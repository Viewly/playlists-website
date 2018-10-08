import React from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import styles from '../index.scss';

const Video = ({ title, description }) => (
  <div styleName='video__container'>
    <img src="https://grpd-wpengine.netdna-ssl.com/wp-content/uploads/2011/04/placeholder.png-498x280.png" />
    <div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  </div>
)

Video.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CSSModules(Video, styles);
