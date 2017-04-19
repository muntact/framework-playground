// TODO: find a lib to sanitize all strings for url consumption; currently would fall over if string contained @ :/
import R from 'ramda';
import { toJSON, urlEncodeSpaces } from './helpers';

const MEME_GENERATOR_URL = 'http://version1.api.memegenerator.net';
// The following are consts with 'const'-ish params, realistically a const shouldn't contain these params
// Its for expediance only.

// instance url + test-user info + lang eng, if this we're taken to prod it would need to take params
const CREATE_INSTANCE = `${MEME_GENERATOR_URL}/Instance_Create?username=test8&password=test8&languageCode=en`;
// generator list url
const DAILY_POPULAR_GENERATORS = `${MEME_GENERATOR_URL}/Generators_Select_ByPopular`;

const getGeneratorUrl = pageSize => `${DAILY_POPULAR_GENERATORS}?pageIndex=0&pageSize=${pageSize}&days=1`;

// convenience helper for making the generator requests with the params.
const fetchInstance = (instanceId, companyCatchPhrase) =>
  fetch(`${CREATE_INSTANCE}&generatorID=${instanceId}&text1=${urlEncodeSpaces(companyCatchPhrase)}`);

// convenience helper for resolving memegenerator requests. which return a success bool and a result Array<MemeObjects>
const handleAPIResponse = (errorText, { success, result }) => {
  if (success) {
    return result;
  } else { // eslint-disable-line no-else-return
    throw new Error(errorText);
  }
};

const joinUserAndMeme = (user, meme) => Object.assign({}, user, meme);

// helper useful for making 'prepared' promise chains.
const nary2ChainableHelper = func => R.curry(R.nAry(2, func));

const requestMemesForAllUsers = (users, memes) =>
  Promise.all(
    R.zipWith(joinUserAndMeme, users, memes) // join the objects together.
      .map(({ company: { catchPhrase }, generatorID }, index) =>
        fetchInstance(generatorID, catchPhrase)
          .then(toJSON)
          .then(exactHandleAPIResponse(`failed at index:${index}`)) // eslint-disable-line no-use-before-define
      )
    );

// nAry2 curried helpers for convenient chaining with 1 arg.
const exactHandleAPIResponse = nary2ChainableHelper(handleAPIResponse);
const exactHandleRequestMemesForAllUsers = nary2ChainableHelper(requestMemesForAllUsers);

/*
 Function which generates a collection of images from memes with the company catch phrase as the meme text,
 then calls the appropriate callback function once the async processes have completed.
  users - the array of users.
  onSuccess - callback function which returns an array of memens
  onFailure - callback function which returns the err object.
*/
const makeMemesWithCompanyCatchPhrases = (users, onSuccess, onFailure) => {
  fetch(getGeneratorUrl(users.length))
    .then(toJSON)
    .then(exactHandleAPIResponse('Failed to get the generators'))
    .then(exactHandleRequestMemesForAllUsers(users))
    .then(onSuccess)
    .catch(onFailure);
};

export default makeMemesWithCompanyCatchPhrases;
