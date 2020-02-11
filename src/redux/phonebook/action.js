/* eslint-disable spaced-comment */
// //without redux toolkit
// import types from './types';

// export const addContact = contact => ({
//   type: types.ADD_CONTACT,
//   payload: {
//     contact,
//   },
// });

// export const saveFilter = filter => ({
//   type: types.SAVE_FILTER,
//   payload: {
//     filter,
//   },
// });

// export const deleteContact = id => ({
//   type: types.DELETE_CONTACT,
//   payload: {
//     id,
//   },
// });

//with redux toolkit
import { createAction } from '@reduxjs/toolkit';
import types from './types';

export const deleteContact = createAction(types.DELETE_CONTACT);
export const saveFilter = createAction(types.SAVE_FILTER);
export const addContact = createAction(types.ADD_CONTACT);
