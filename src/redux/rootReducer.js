import { combineReducers } from 'redux';
import reducer from './phonebook/reducer';

const rootReducer = combineReducers({
  phonebook: reducer,
});

export default rootReducer;
