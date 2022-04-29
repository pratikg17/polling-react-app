const initialData = {
  myPolls: [],
  allPolls: [],
  selectedPoll: null,
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
    case "GET_POLL_BY_ID":
      return {
        ...state,
        selectedPoll: action.payload,
      };
    default:
      return state;
  }
};
