import React, { Component } from "react";
import PostEdit from "./PostEdit";

class PostEditPage extends Component {
  render() {
    return (
      <div>
        Post Edit Page
        <PostEdit
          postId={this.props.match.params.postId}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default PostEditPage;
