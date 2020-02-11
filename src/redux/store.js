/* eslint-disable spaced-comment */
//without redux toolkit
// import { createStore } from 'redux';
// import rootReducer from './rootReducer';

// const store = createStore(
//   rootReducer,
//   // eslint-disable-next-line no-underscore-dangle
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

// export default store;

//with redux toolkit
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
