// This Reducer is responsible for applying the modifications to the store
// taking the current state as input, modifying it and returning back the modified state to the Redux store
const initState = {
  theme: '',
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default Reducer;
