const initialData = {
  user: {},
  walletHistory: [],
};

export const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
