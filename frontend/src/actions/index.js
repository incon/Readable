export const UPDATE_CATEGOROIES = "UPDATE_CATEGORIES";

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
