import { IAction } from '../types/applicationReducer';

export const USER_SET_NAME = 'user/SET_NAME';
export interface IUserSetNamePayload {
  name: string;
}

export type UserAction = IAction<typeof USER_SET_NAME, IUserSetNamePayload>
// States

export interface IUserState {
  name: string;
}

const initialState: IUserState = {
  name: 'John'
};

// Reducer

export default (state = initialState, action: UserAction) => {
  switch (action.type) {
    case USER_SET_NAME:
      return { ...state, name: action.payload.name }
    default:
      return state;
  }
}
