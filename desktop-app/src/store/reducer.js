const initialState = {
  coins: [],
  currencies: [],
  deleteStatus: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COINS":
      return {
        ...state,
        coins: action.coins,
      };
    case "SET_CURRS":
      return {
        ...state,
        currencies: action.currencies,
      };
    case "DELETE_STATUS":
      return {
        ...state,
        deleteStatus: !state.deleteStatus,
      };
    default:
      return state;
  }
};

export default Reducer;
