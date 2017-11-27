import React, { Component } from "react";
import { patchComment, createComment } from "../actions/index";
import { connect } from "react-redux";

class CommentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.new ? { body: "", author: "" } : this.props.comment
    };
  }

  componentDidMount() {
    this.setState({ isValid: this.validate(this.props.comment) });
  }

  randomId() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (var i = 20; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  validate() {
    const { body, author } = this.state.comment;
    return body !== "" && author !== "";
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      comment: { ...prevState.comment, [name]: value },
      isValid: this.validate({ ...prevState.comment, [name]: value })
    }));
  };

  submit(event) {
    event.preventDefault();
    const { id, body, author } = this.state.comment;
    const comment = {
      id,
      body,
      author
    };

    if (this.props.new) {
      this.props.createComment({
        ...comment,
        id: this.randomId(),
        timestamp: Date.now(),
        parentId: this.props.parentId
      });
    } else {
      this.props.patchComment(comment);
      this.props.update(this.state.comment);
    }
  }

  render() {
    const { comment } = this.state;
    return (
      <div className="comment">
        <form onSubmit={event => this.submit(event)}>
          <label>
            Name<br />
            <textarea
              name="body"
              value={comment.body}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Author<br />
            <input
              name="author"
              type="text"
              value={comment.author}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={event => this.props.cancel(event)}>
            Cancel
          </button>
          {this.props.new ? (
            <button disabled={!this.validate()} type="submit">
              Submit
            </button>
          ) : (
            <button disabled={!this.validate()} type="submit">
              Update
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default connect(null, { patchComment, createComment })(CommentEdit);
