import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost, updateComment } from "../actions/index";

class Score extends Component {
  vote(option) {
    const { type, data } = this.props;
    fetch(`http://localhost:3001/${type}/${data.id}`, {
      method: "post",
      body: JSON.stringify({ option: option }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (this.props.type === "posts") {
          this.props.updatePost(data);
        }
        if (this.props.type === "comments") {
          this.props.updateComment(data);
        }
      });
  }

  render() {
    const { data } = this.props;
    return (
      <div className="score">
        <span>
          <strong>Score</strong> {data.voteScore}{" "}
        </span>
        <button onClick={() => this.vote("upVote")}>+</button>
        <button onClick={() => this.vote("downVote")}>-</button>
      </div>
    );
  }
}

export default connect(null, { updatePost, updateComment })(Score);
