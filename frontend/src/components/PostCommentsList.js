import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostComments } from "../actions/index";
import "./CategoriesList.css";

class PostCommentsList extends Component {
  componentWillMount() {
    this.props.fetchPostComments(this.props.postId);
  }

  render() {
    const comments = this.props.comments[this.props.postId];

    if (comments) {
      return (
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id}>
              <div>Author: {comment.author}</div>
              <div>Body: {comment.body}</div>
            </div>
          ))}
        </div>
      );
    }

    return <div>No comments found</div>;
  }
}

function mapStateToProps(state) {
  return { comments: state.comments };
}

export default connect(mapStateToProps, { fetchPostComments })(
  PostCommentsList
);
