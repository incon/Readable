import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions/index";

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
        <div>
          <Link to="/posts/create">Create Post</Link>
        </div>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="post-item">
              <div>Title: {post.title}</div>
              <div>Body: {post.body}</div>
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
