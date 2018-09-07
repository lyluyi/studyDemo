import { FETCH_USER_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_FAILURE, LOAD_USER_FULFILLED, LOAD_USER_REJECTED } from "../constants";

const initiaState = {
  isFetching: false,
  error: null,
  user: {}
}

const user = (state = initiaState, action = {}) => {
  console.log('===============/reducers/user.js================')
  console.log(action)
  switch (action.type) {
    case LOAD_USER_FULFILLED:
      return {
        user: action.payload.data.results[0],  // acions/index.js 下  return 出的 actions
        isFetching: false,
        error: null
      }
    case FETCH_USER_REQUEST:
      return {
        isFetching: true,
        error: null,
        user: {}
      }
    case LOAD_USER_REJECTED:
    return {
      isFetching: false,
      error: action.payload.response.data,
      user: {}
    }
    default:
      return state;
  }
};

export default user;