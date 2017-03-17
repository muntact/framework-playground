import { createAction } from 'redux-actions';

export const fetchUsers = createAction('FETCH_USERS');
export const fetchUsersSuccess = createAction('FETCH_USERS_SUCCESS');
export const fetchUsersFailure = createAction('FETCH_USERS_FAILURE');
