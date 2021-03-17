const reducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    case "CREATE_POST":
      return [...state, action.payload];
    case "UPDATE_POST":
    case "LIKE_POST":
      // find product and add likes
      return state.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    case "DELETE_POST":
      return state.filter((p) => p._id !== action.payload);

    default:
      return state;
  }
};

export default reducer;
