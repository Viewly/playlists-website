import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, author, tags }) => (
  <div className='c-section'>
    <div className='o-wrapper'>
      <h2 className='c-section__title'>{title}</h2>

      <p>Created in collaboration with Digital DJ Tips, the following step-by-step TRAKTOR tutorials cover everything from getting TRAKTOR set up and how your music files are imported, to cueing, EQ, loops, and more.</p>

      <ul>
        <li>Created by {author}</li>
        <li>Length: 36:50</li>
        {tags && <li>Tags: {tags.join(', ')}</li>}
      </ul>

    </div>
  </div>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.array
};

export default Header;
