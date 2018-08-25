export const USER_SET_NAME = 'user/SET_NAME';

const initialState = {
  name: 'zhang'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_NAME:
      return { ...state, name: action.name }
    default:
      return state;
  }
}
