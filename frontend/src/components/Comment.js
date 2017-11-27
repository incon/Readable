import React, { Component } from "react";
import CommentEdit from "./CommentEdit";
import { connect } from "react-redux";
import { fetchPostComments } from "../actions/index";
import { format } from "date-fns";
import Score from "./Score";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  deleteComment(comment) {
    fetch(`http://localhost:3001/comments/${comment.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(this.props.fetchPostComments(comment.parentId));
  }

  view() {
    const { comment } = this.props;
    return (
      <div className="comment">
        <h3>Comment</h3>
        <Score type="comments" data={comment} />
        <div className="comment-body">{comment.body}</div>
        <div className="comment-when-by">
          Posted {format(new Date(comment.timestamp), "YYYY-MM-DD HH:mm:ss")} by{" "}
          {comment.author}
        </div>
        <div className="comment-footer">
          <button onClick={() => this.setState({ edit: true })}>Edit</button>
          <button onClick={() => this.deleteComment(comment)}>Delete</button>
        </div>
      </div>
    );
  }

  cancel = event => {
    event.preventDefault();
    this.setState({ edit: false });
  };

  update = comment => {
    this.setState({ edit: false, comment: comment });
  };

  render() {
    if (this.state.edit) {
      return (
        <CommentEdit
          comment={this.props.comment}
          update={this.update}
          cancel={this.cancel}
        />
      );
    }

    return this.view();
  }
}

export default connect(null, { fetchPostComments })(Comment);
