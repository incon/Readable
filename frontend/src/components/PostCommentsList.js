import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostComments } from "../actions/index";
import Comment from "./Comment";

class PostCommentsList extends Component {
  componentWillMount() {
    this.props.fetchPostComments(this.props.postId);
  }

  render() {
    const { postId } = this.props;
    const comments = this.props.comments[postId];

    if (comments) {
      return (
        <div className="comments">
          <div className="comments-list">
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
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
