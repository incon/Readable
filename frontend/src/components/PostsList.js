import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, deletePost } from "../actions/index";
import Post from "./Post";
import "./PostsList.css";

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "SCORE_DESC"
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  onRemovePost = postId => {
    this.props.deletePost(postId);
  };

  posts() {
    const { posts, category } = this.props;

    if (!posts) {
      return false;
    }

    if (category === "all") {
      return posts.sort(this.sortBy);
    }

    return posts.filter(post => post.category === category).sort(this.sortBy);
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

  sortByDate(a, b) {
    if (a.timestamp < b.timestamp) {
      return -1;
    }

    if (a.timestamp > b.timestamp) {
      return 1;
    }

    return 0;
  }

  sortBy = (a, b) => {
    if (this.state.sortBy === "SCORE_ASC") {
      return this.sortByScore(a, b);
    }

    if (this.state.sortBy === "SCORE_DESC") {
      return this.sortByScore(b, a);
    }

    if (this.state.sortBy === "DATE_ASC") {
      return this.sortByDate(a, b);
    }

    if (this.state.sortBy === "DATE_DESC") {
      return this.sortByDate(b, a);
    }
  };

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render() {
    const posts = this.posts();

    return (
      <div className="post-list">
        <h2>{this.toTitleCase(this.props.category)} Posts</h2>
        <div className="post-list-actions">
          <span className="sort-item">
            <span className="sort-label">Score</span>
            <button
              className={`sort-button ${
                this.state.sortBy === "SCORE_ASC" ? "sort-button-current" : ""
              }`}
              onClick={() => this.setState({ sortBy: "SCORE_ASC" })}
            >
              Low - High
            </button>
            <button
              className={`sort-button ${
                this.state.sortBy === "SCORE_DESC" ? "sort-button-current" : ""
              }`}
              onClick={() => this.setState({ sortBy: "SCORE_DESC" })}
            >
              High - Low
            </button>
          </span>
          <span className="sort-item">
            <span className="sort-label">Date</span>
            <button
              className={`sort-button ${
                this.state.sortBy === "DATE_ASC" ? "sort-button-current" : ""
              }`}
              onClick={() => this.setState({ sortBy: "DATE_ASC" })}
            >
              Old - New
            </button>
            <button
              className={`sort-button ${
                this.state.sortBy === "DATE_DESC" ? "sort-button-current" : ""
              }`}
              onClick={() => this.setState({ sortBy: "DATE_DESC" })}
            >
              New - Old
            </button>
          </span>
          <Link to="/posts/create">
            <button>New</button>
          </Link>
        </div>
        {posts.length > 0 ? (
          posts.map(post => (
            <Post
              key={post.id}
              post={post}
              view={true}
              onRemovePost={this.onRemovePost}
            />
          ))
        ) : (
          <div>No posts in {this.props.category}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostsList);
