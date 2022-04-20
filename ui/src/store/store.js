import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '../reducers/rootReducer';
import { callToApiMiddleware } from '../addons/middleware';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(callToApiMiddleware)
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
