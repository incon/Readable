import {
  UPDATE_CATEGORIES,
  UPDATE_POSTS,
  UPDATE_POST,
  UPDATE_POST_COMMENTS,
  UPDATE_COMMENT,
  REMOVE_POST,
  REMOVE_COMMENT
} from "./types";

export const fetchCategories = () => {
  return dispatch => {
    fetch("http://localhost:3001/categories", {
      method: "GET",
      headers: {
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(json => dispatch(updateCategories(json.categories)));
  };
};

export const updateCategories = categories => ({
  type: UPDATE_CATEGORIES,
  categories: categories
});

export const fetchPosts = () => {
  return dispatch => {
    fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(json => dispatch(updatePosts(json)));
  };
};

export const updatePosts = posts => ({
  type: UPDATE_POSTS,
  posts: posts
});

export const fetchPost = postId => {
  return dispatch => {
    fetch(`http://localhost:3001/posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(json => dispatch(updatePost(json)));
  };
};

export const updatePost = post => ({
  type: UPDATE_POST,
  post: post
});

export const fetchPostComments = postId => {
  return dispatch => {
    fetch(`http://localhost:3001/posts/${postId}/comments`, {
      method: "GET",
      headers: {
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(json => dispatch(updatePostComments(postId, json)));
  };
};

export const updatePostComments = (postId, comments) => ({
  type: UPDATE_POST_COMMENTS,
  postId: postId,
  comments: comments
});

export const patchComment = comment => {
  return dispatch => {
    fetch(`http://localhost:3001/comments/${comment.id}`, {
      method: "put",
      body: JSON.stringify({ body: comment.body, author: comment.author }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(comment => dispatch(updateComment(comment)));
  };
};

export const updateComment = comment => {
  return {
    type: UPDATE_COMMENT,
    comment: comment
  };
};

export const createComment = comment => {
  return dispatch => {
    fetch(`http://localhost:3001/comments`, {
      method: "post",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(comment => dispatch(updateComment(comment)));
  };
};

export const deletePost = postId => {
  return dispatch => {
    fetch(`http://localhost:3001/posts/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(json => dispatch(removePost(postId)));
  };
};

export const removePost = postId => {
  return {
    type: REMOVE_POST,
    postId: postId
  };
};

export const deleteComment = comment => {
  return dispatch => {
    fetch(`http://localhost:3001/comments/${comment.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "whatever-you-want"
      }
    })
      .then(res => res.json())
      .then(json => dispatch(removeComment(comment)));
  };
};

export const removeComment = comment => {
  return {
    type: REMOVE_COMMENT,
    comment: comment
  };
};
