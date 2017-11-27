import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostComments } from "../actions/index";
import Comment from "./Comment";
import CommentEdit from "./CommentEdit";
import "./Comment.css";

class PostCommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addComment: false
    };
  }

  componentDidMount() {
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

  cancel = event => {
    event.preventDefault();
    this.setState({ addComment: false });
  };

  update = () => {
    this.setState({ addComment: false });
  };

  render() {
    const { postId } = this.props;
    let comments = this.props.comments[postId]
      ? this.props.comments[postId].sort((a, b) => this.sortByScore(b, a))
      : {};

    if (comments.length > 0) {
      return (
        <div className="comments">
          {comments.length > 0 && <h2>Comments</h2>}
          <div className="comments-list">
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} postId={postId} />
            ))}
          </div>
          <br />
          {!this.state.addComment ? (
            <button onClick={() => this.setState({ addComment: true })}>
              Add Comment
            </button>
          ) : (
            <CommentEdit
              new={true}
              cancel={this.cancel}
              update={this.update}
              parentId={postId}
            />
          )}
        </div>
      );
    }

    return (
      <div>
        <div>No comments found</div>
        {!this.state.addComment ? (
          <button onClick={() => this.setState({ addComment: true })}>
            Add Comment
          </button>
        ) : (
          <CommentEdit
            new={true}
            cancel={this.cancel}
            update={this.update}
            parentId={postId}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { comments: state.comments };
}

export default connect(mapStateToProps, { fetchPostComments })(
  PostCommentsList
);
