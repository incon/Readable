export const UPDATE_CATEGOROIES = "UPDATE_CATEGORIES";
export const UPDATE_POSTS = "UPDATE_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_COMMENTS = "UPDATE_POST_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

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
  type: UPDATE_CATEGOROIES,
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
      .then(json => dispatch(updatePost(postId, json)));
  };
};

export const updatePost = (postId, post) => ({
  type: UPDATE_POST,
  postId: postId,
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
