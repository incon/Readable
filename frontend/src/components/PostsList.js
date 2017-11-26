import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions/index";
import { format } from "date-fns";
import "./PostsList.css";

class PostsList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  posts() {
    const { posts, category } = this.props;

    if (!posts) {
      return false;
    }

    if (category === "all") {
      return posts;
    }

    return posts.filter(post => post.category === category);
  }

  render() {
    const posts = this.posts();

    return (
      <div className="post-list">
        <div className="post-list-actions">
          <Link to="/posts/create">
            <button>New</button>
          </Link>
        </div>
        {posts.length > 0 ? (
          posts.map(post => (
            <div className="post-list-item" key={post.id}>
              <div className="post-list-item-title">{post.title}</div>
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
