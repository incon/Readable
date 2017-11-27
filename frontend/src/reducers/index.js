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
    case "UPDATE_COMMENT":
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.parentId]: state.comments[action.comment.parentId]
            ? [
                ...state.comments[action.comment.parentId].filter(
                  comment => comment.id !== action.comment.id
                ),
                action.comment
              ]
            : []
        }
      };
    default:
      return state;
  }
}
