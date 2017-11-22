export const UPDATE_CATEGOROIES = "UPDATE_CATEGORIES";
export const UPDATE_POSTS = "UPDATE_POSTS";

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
