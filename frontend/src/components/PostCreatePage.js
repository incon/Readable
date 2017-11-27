import React, { Component } from "react";
import PostEdit from "./PostEdit";
import { Link } from "react-router-dom";

function PostCretePage(props) {
  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Create a New Post</h2>
      <PostEdit new={true} history={props.history} />
    </div>
  );
}

export default PostCretePage;
