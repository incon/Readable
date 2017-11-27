import React, { Component } from "react";
import PostEdit from "./PostEdit";
import { Link } from "react-router-dom";

class PostEditPage extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h2>Post Edit</h2>
        <PostEdit
          postId={this.props.match.params.postId}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default PostEditPage;
