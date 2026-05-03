export const setCoinsAction = (val) => {
  return {
    type: "SET_COINS",
    coins: val,
  };
};

export const setCurrenciesAction = (val) => {
  return {
    type: "SET_CURRS",
    currencies: val,
  };
};
export const deleteStatus = () => {
  return {
    type: "DELETE_STATUS",
  };
};
