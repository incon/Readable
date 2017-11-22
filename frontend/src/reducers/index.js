export default function(state = {}, action) {
  switch (action.type) {
    case "UPDATE_CATEGORIES":
      return { ...state, categories: action.categories };
    case "UPDATE_POSTS":
      return { ...state, posts: action.posts };
    default:
      return state;
  }
}
