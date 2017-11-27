import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostComments } from "../actions/index";
import Comment from "./Comment";

class PostCommentsList extends Component {
  componentWillMount() {
    this.props.fetchPostComments(this.props.postId);
  }
  sortByScore(a, b) {
    if (a.voteScore < b.voteScore) {
      return -1;
    }

    if (a.voteScore > b.voteScore) {
      return 1;
    }

    return 0;
  }

  render() {
    const { postId } = this.props;
    let comments = this.props.comments[postId]
      ? this.props.comments[postId].sort((a, b) => this.sortByScore(b, a))
      : false;

    if (comments) {
      return (
        <div className="comments">
          {comments.length > 0 && <h2>Comments</h2>}
          <div className="comments-list">
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} postId={postId} />
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
