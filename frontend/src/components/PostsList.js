import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions/index";
import { format } from "date-fns";
import "./PostsList.css";

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "SCORE_DESC"
    };
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

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

  render() {
    const posts = this.posts();

    return (
      <div className="post-list">
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
            <div className="post-list-item" key={post.id}>
              <div className="post-list-item-title">{post.title}</div>
              <div className="post-list-item-score">Score {post.voteScore}</div>
              <div className="post-list-item-body">{post.body}</div>
              <div>
                <span className="post-list-item-category">{post.category}</span>
              </div>
              <div className="post-list-item-when-by">
                Posted {format(new Date(post.timestamp), "YYYY-MM-DD HH:mm:ss")}{" "}
                by {post.author}
              </div>
              <div className="post-list-item-footer">
                <Link to={`/post/${post.id}`}>
                  <button>View</button>
                </Link>
                <Link to={`/posts/${post.id}/edit`}>
                  <button>Edit</button>
                </Link>
              </div>
            </div>
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

export default connect(mapStateToProps, { fetchPosts })(PostsList);
