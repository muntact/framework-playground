import { toJSON } from './helpers';

const USER_DATA_URL = 'http://jsonplaceholder.typicode.com/users';

/*
 Function which pulls user data from the USER_DATA API and then calls the appropriate callback fn.
  onSuccess - callback function which returns an array of memens
  onFailure - callback function which returns the err object.
*/
const getUsers = (onSuccess, onFailure) => {
  fetch(USER_DATA_URL)
    .then(toJSON)
    .then(onSuccess)
    .catch(onFailure);
};

export default getUsers;
