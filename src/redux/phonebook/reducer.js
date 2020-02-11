/* eslint-disable spaced-comment */
//without redux toolkit
// import { combineReducers } from 'redux';
// import types from './types';

// const reducerContact = (state = [], action) => {
//   switch (action.type) {
//     case types.ADD_CONTACT:
//       return [...state, action.payload.contact];
//     case types.DELETE_CONTACT:
//       return state.filter(el => el.id !== action.payload.id);
//     default:
//       return state;
//   }
// };

// const reducerFilter = (state = '', action) => {
//   switch (action.type) {
//     case types.SAVE_FILTER:
//       return action.payload.filter;

//     default:
//       return state;
//   }
// };

// export default combineReducers({
//   contacts: reducerContact,
//   filter: reducerFilter,
// });

//with redux toolkit
import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import types from './types';

const reducerContact = createReducer([], {
  [types.ADD_CONTACT]: (state, action) => [...state, action.payload],
  [types.DELETE_CONTACT]: (state, action) =>
    state.filter(el => el.id !== action.payload),
});

const reducerFilter = createReducer('', {
  [types.SAVE_FILTER]: (state, action) => action.payload,
});

export default combineReducers({
  contacts: reducerContact,
  filter: reducerFilter,
});
