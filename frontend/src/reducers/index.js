export default function(state = {}, action) {
  switch (action.type) {
    case "UPDATE_CATEGORIES":
      return { ...state, categories: action.categories };
    default:
      return state;
  }
}
