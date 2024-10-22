const redux = require('redux');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const {thunk} = require('redux-thunk')
const axios = require('axios')
//State

const initialState = {
  loading: false,
  users: [],
  error: "",
};

//action Type

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

//action creator

const fetchUserRequested = () => {
  return {
    type: FETCH_USER_REQUESTED,
  };
};

const fetchUserSucceeded = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
};

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: error,
  };
};

//Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
        users: [],
        error: "",
      };
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//Async function

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequested())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response=>{
            //response.data is users
            const users = response.data.map((user)=>user.id)
            dispatch(fetchUserSucceeded(users))
        }).catch((error)=>{
            //error.message is error message
            dispatch(fetchUserFailed(error.message))
        })
    }
}

//Store

const store = createStore(
    reducer,
    applyMiddleware(thunk) // Correct spelling and middleware
);
store.subscribe(()=>{
    console.log(store.getState())
})
store.dispatch(fetchUsers())
