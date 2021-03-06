import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, deletePost } from "../actions/index";
import PostCommentsList from "./PostCommentsList";
import { Link } from "react-router-dom";
import Post from "./Post";

class PostPage extends Component {
  componentDidMount() {
    const postId = this.props.match.params.postId;
    this.props.fetchPost(postId);
  }

  findPostById(postId) {
    const { posts } = this.props;
    return (
      posts &&
      posts.filter(post => post.id === this.props.match.params.postId)[0]
    );
  }

  onRemovePost = postId => {
    this.props.deletePost(postId);
    this.props.history.push(`/`);
  };

  render() {
    const { postId } = this.props.match.params;
    const post = this.findPostById(postId);

    if (post) {
      return (
        <div>
          <Link to="/">Home</Link>
          <span> > </span>
          <Link to={`/category/${post.category}`}>{post.category}</Link>
          <br />
          <br />
          <Post post={post} onRemovePost={this.onRemovePost} />
          <PostCommentsList postId={postId} />
        </div>
      );
    }

    return <div>Post not found</div>;
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostPage);
