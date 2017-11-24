import React, { Component } from "react";
import { patchComment } from "../actions/index";
import { connect } from "react-redux";

class CommentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment,
      isValid: false
    };
  }

  componentDidMount() {
    this.setState({ isValid: this.validate(this.props.comment) });
  }

  validate(comment) {
    const { body, author } = comment;
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

    this.props.patchComment(comment);
    this.props.update(this.state.comment);
  }

  render() {
    const { comment } = this.state;
    return (
      <div className="comment">
        <form onSubmit={event => this.submit(event)}>
          <label>
            Name:
            <textarea
              name="body"
              value={comment.body}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Author:
            <input
              name="author"
              type="text"
              value={comment.author}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <input
            type="button"
            onClick={event => this.props.cancel(event)}
            value="cancel"
          />
          <input disabled={!this.state.isValid} type="submit" value="Update" />
        </form>
      </div>
    );
  }
}

export default connect(null, { patchComment })(CommentEdit);
