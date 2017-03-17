import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  users: [],
  fetchStatus: 'NOT_STARTED',
};

type UserState = {
  fetchStatus: string,
  users: Array,
};

type Response = {
  payload: {
    fetchStatus: string,
    users: Array,
  }
};


export const handleFailure = (userState: UserState) => ({
  users: userState.users, fetchStatus: 'FAILED',
});
export const handlePending = (userState: UserState) => ({
  users: userState.users, fetchStatus: 'PENDING',
});
export const handleSuccess = (userState: UserState, response: Response) => ({
  users: response.payload, fetchStatus: 'SUCCESS',
});

const actionMap = {
  [actions.fetchUsers]: handlePending,
  [actions.fetchUsersSuccess]: handleSuccess,
  [actions.fetchUsersFailure]: handleFailure,
};

export default handleActions(actionMap, initialState);
