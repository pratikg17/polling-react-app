const initialData = {
  myPolls: [],
  allPolls: [],
  pollResults: [],
  selectedPoll: null,
  selectedPollForVote: null,
  userPollData: null,
};

export const pollsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_MY_POLLS":
      return {
        ...state,
        myPolls: action.payload,
      };
    case "GET_ALL_POLL_RESULTS":
      return {
        ...state,
        pollResults: action.payload,
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
    case "GET_POLL_RESULT_BY_ID":
      return {
        ...state,
        selectedPollForVote: action.payload,
      };
    case "GET_USER_VOTE_DATA":
      return {
        ...state,
        userPollData: action.payload,
      };
    default:
      return state;
  }
};
