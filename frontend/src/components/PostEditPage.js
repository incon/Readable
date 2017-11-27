import React, { Component } from "react";
import PostEdit from "./PostEdit";
import { Link } from "react-router-dom";

function PostEditPage(props) {
  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Post Edit</h2>
      <PostEdit postId={props.match.params.postId} history={props.history} />
    </div>
  );
}

export default PostEditPage;
