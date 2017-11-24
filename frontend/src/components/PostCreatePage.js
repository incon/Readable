import React, { Component } from "react";
import PostEdit from "./PostEdit";

class PostCretePage extends Component {
  render() {
    return (
      <div>
        Post Create Page
        <PostEdit new={true} history={this.props.history} />
      </div>
    );
  }
}

export default PostCretePage;
