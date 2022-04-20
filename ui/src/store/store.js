import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '../reducers/rootReducer';

const callToApiMiddleware = (storeAPI) => (next) => (action) => {
  console.log('action...');
  // const res = await fetch('http://localhost:3000/chain-data/symbols');
  // const data = await res.json();
  // console.log(data);
  return '';
  return next(action);
};

const composedEnhancer = composeWithDevTools(
  applyMiddleware(callToApiMiddleware)
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
