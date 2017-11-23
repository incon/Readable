export default function(state = { posts: [], comments: [] }, action) {
  switch (action.type) {
    case "UPDATE_CATEGORIES":
      return { ...state, categories: action.categories };
    case "UPDATE_POSTS":
      return { ...state, posts: action.posts };
    case "UPDATE_POST":
      return {
        ...state,
        posts: [
          ...state.posts.filter(post => post.id !== action.postId),
          action.post
        ]
      };
    case "UPDATE_POST_COMMENTS":
      return {
        ...state,
        comments: { ...state.comments, [action.postId]: action.comments }
      };
    default:
      return state;
  }
}
