const initialData = {
  myPolls: [],
  allPolls: [],
};

export const pollsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_MY_POLLS":
      return {
        ...state,
        myPolls: action.payload,
      };
    case "GET_ALL_POLLS":
      return {
        ...state,
        allPolls: action.payload,
      };
    default:
      return state;
  }
};
