import React, { Component } from "react";
import CommentEdit from "./CommentEdit";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      comment: this.props.comment
    };
  }

  view() {
    const { comment } = this.state;
    return (
      <div className="comment">
        <div>Author: {comment.author}</div>
        <div>Body: {comment.body}</div>
        <button onClick={() => this.setState({ edit: true })}>Edit</button>
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
          comment={this.state.comment}
          update={this.update}
          cancel={this.cancel}
        />
      );
    }

    return this.view();
  }
}

export default Comment;
