import React, { Component } from "react";
import PostEdit from "./PostEdit";
import { Link } from "react-router-dom";

class PostCretePage extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h2>Create a New Post</h2>
        <PostEdit new={true} history={this.props.history} />
      </div>
    );
  }
}

export default PostCretePage;
