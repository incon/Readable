import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../actions/index";
import PostCommentsList from "./PostCommentsList";

class PostPage extends Component {
  componentWillMount() {
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

  render() {
    const { postId } = this.props.match.params;
    const post = this.findPostById(postId);

    if (post) {
      return (
        <div>
          <div>Title: {post.title}</div>
          <div>Body: {post.body}</div>
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

export default connect(mapStateToProps, { fetchPost })(PostPage);
