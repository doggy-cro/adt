import { combineReducers } from 'redux';
import { chainReducer } from './chainReducer';

export const rootReducer = combineReducers({
  chainData: chainReducer,
});
