import { combineReducers } from 'redux';
import { chainReducer } from './chainReducer';
import { priceReducer } from './priceReducer';

export const rootReducer = combineReducers({
  chainData: chainReducer,
  priceData: priceReducer,
});
