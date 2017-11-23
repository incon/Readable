import React, { Component } from "react";

class PostCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      body: "",
      author: "",
      category: "",
      isValid: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  randomId() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (var i = 20; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    const formFields = ["title", "body", "author", "category"];

    // Not emtpy
    const newState = { ...this.state, [name]: value };

    const isValid =
      formFields.filter(field => newState[field] === "").length === 0;

    this.setState({
      ...newState,
      isValid: isValid
    });
  }

  createPost(event) {
    event.preventDefault();
    const id = this.randomId();
    const { title, body, author, category } = this.state;
    const post = {
      id,
      title,
      body,
      author,
      category
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
      .then(this.props.history.push(`/post/${id}`));
  }

  render() {
    return (
      <div>
        Post Create Page
        <form onSubmit={event => this.createPost(event)}>
          <input type="hidden" value={this.randomId()} />
          <label>
            Name:
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
              defaultValue={this.state.body}
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
              value={this.state.author}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <select
            name="category"
            defaultValue={this.state.category}
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
          <input disabled={!this.state.isValid} type="submit" value="Submit" />
        </form>
        <button onClick={() => this.createPost()}>Create</button>
      </div>
    );
  }
}

export default PostCreatePage;
