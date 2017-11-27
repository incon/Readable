import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../actions/index";
import { format } from "date-fns";
import Score from "./Score";

function removePost(postId) {
  this.props.deletePost(postId);
  this.props.history.push(`/`);
}

function Post(props) {
  const { post } = props;

  return (
    <div className="post-list-item">
      <div className="post-list-item-title">{post.title}</div>
      <div className="post-list-item-comments">
        Comments: {post.commentCount}
      </div>
      <Score type="posts" data={post} />
      <div className="post-list-item-body">{post.body}</div>
      <div>
        <span className="post-list-item-category">{post.category}</span>
      </div>
      <div className="post-list-item-when-by">
        Posted {format(new Date(post.timestamp), "YYYY-MM-DD HH:mm:ss")} by{" "}
        {post.author}
      </div>
      <div className="post-list-item-footer">
        {props.view && (
          <Link to={`/${post.category}/${post.id}`}>
            <button>View</button>
          </Link>
        )}
        <Link to={`/posts/${post.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => this.removePost(post.id)}>Delete</button>
      </div>
    </div>
  );
}

export default connect(null, { deletePost })(Post);
