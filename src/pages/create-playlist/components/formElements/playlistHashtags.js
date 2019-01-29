import React, { Component } from "react";
import { connect } from "react-redux";
import { hashtagsFetch } from "../../../../actions";

const ReactTags = require("react-tag-autocomplete");

@connect((state) => ({
  hashtags: state.hashtags
}), (dispatch) => ({
  hashtagsFetch: () => dispatch(hashtagsFetch({ limit: 1000 })),
}))
export default class PlaylistHashtags extends Component {
  state = {
    tags: [],
    initialValue: ""
  };

  componentDidMount() {
    const { hashtagsFetch, value } = this.props;

    hashtagsFetch();

    if (value.length > 0) {
      this.setState({
        initialValue: value,
        tags: value ? value.split(" ").map(item => ({ id: item, name: item })) : []
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    const { initialValue } = prevState;

    if (initialValue !== value) {
      this.setState({
        initialValue: value,
        tags: value ? value.split(" ").map(item => ({ id: item, name: item })) : []
      })
    }
  }

  handleDelete(i) {
    const { onChange } = this.props;
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });

    onChange(tags);
  }

  handleAddition(tag) {
    const { onChange } = this.props;

    if (tag.name.substring(0, 1) !== '#') {
      return false;
    }

    const isDuplicate = this.state.tags.filter(item => item.name === tag.name).length > 0;
    if (isDuplicate) {
      return false;
    }

    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });

    onChange(tags);
  }

  render() {
    const { hashtags } = this.props;
    const suggestions = hashtags.data.map(item => ({ id: item.hashtag, name: item.hashtag }));
    const styles = {
      root: 'c-react-tags c-input c-input--primary',
      rootFocused: 'is-focused',
      selected: 'c-react-tags__selected',
      selectedTag: 'c-react-tags__selected-tag',
      selectedTagName: 'c-react-tags__selected-tag-name',
      search: 'c-react-tags__search',
      searchInput: 'c-react-tags__search-input',
      suggestions: 'c-react-tags__suggestions',
      suggestionActive: 'is-active',
      suggestionDisabled: 'is-disabled'
    }

    return (
      <li>
        <label className='c-form__label'>Hashtags</label>
        <ReactTags
          allowNew
          autofocus={false}
          tags={this.state.tags}
          ref={(ref) => window.ref = ref}
          suggestions={suggestions}
          classNames={styles}
          placeholder={"#hashtags"}
          delimiterChars={[',', ' ']}
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this)}/>

      </li>
    );
  }
}
