import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../actions/index";

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      timestamp: "",
      title: "",
      body: "",
      author: "",
      category: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    if (this.props.new) {
    } else {
      this.props.fetchPost(this.props.postId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.new) {
      const {
        id,
        timestamp,
        title,
        body,
        author,
        category
      } = this.findPostById(this.props.id, nextProps);
      this.setState({
        id,
        timestamp,
        title,
        body,
        author,
        category
      });
    }
  }

  findPostById(postId, nextProps) {
    const { posts } = nextProps;
    return posts && posts.filter(post => post.id === this.props.postId)[0];
  }

  randomId() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (var i = 20; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  validate() {
    const formFields = ["title", "body", "author", "category"];
    // Not emtpy
    return formFields.filter(field => this.state[field] === "").length === 0;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ ...this.state, [name]: value });
  }

  post() {
    const { id, timestamp, title, body, author, category } = this.state;
    return {
      id,
      timestamp,
      title,
      body,
      author,
      category
    };
  }

  submit(event) {
    event.preventDefault();
    const post = this.post();
    if (this.props.new) {
      this.createPost(post);
    } else {
      this.patchPost(post);
    }
  }

  createPost(post) {
    post = {
      ...post,
      id: this.randomId(),
      timestamp: Date.now()
    };
    fetch("http://localhost:3001/posts", {
      method: "post",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(this.props.history.push(`/post/${post.id}`));
  }

  patchPost(post) {
    fetch(`http://localhost:3001/posts/${post.id}`, {
      method: "put",
      body: JSON.stringify({ title: post.title, body: post.body }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(this.props.history.push(`/post/${post.id}`));
  }

  render() {
    return (
      <form onSubmit={event => this.submit(event)}>
        <input type="hidden" value={this.state.id} />
        <label>
          Title:
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          body:
          <textarea
            value={this.state.body}
            name="body"
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            name="author"
            type="text"
            disabled={!this.props.new}
            value={this.state.author}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <select
          name="category"
          value={this.state.category}
          disabled={!this.props.new}
          onChange={this.handleInputChange}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="react">React</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
        </select>
        <br />
        {this.props.new ? (
          <input disabled={!this.validate()} type="submit" value="Submit" />
        ) : (
          <input disabled={!this.validate()} type="submit" value="Update" />
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPost })(PostEdit);
