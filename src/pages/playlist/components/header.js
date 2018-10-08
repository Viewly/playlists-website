import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, author, tags }) => (
  <div>
    <h2>{title}</h2>

    <ul>
      <li>Created by {author}</li>
      <li>Length: 36:50</li>
      {tags && <li>Tags: {tags.join(', ')}</li>}
    </ul>

    <p>Created in collaboration with Digital DJ Tips, the following step-by-step TRAKTOR tutorials cover everything from getting TRAKTOR set up and </p>
  </div>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.array
};

export default Header;
