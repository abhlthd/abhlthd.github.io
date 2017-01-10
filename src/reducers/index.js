import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { credential } from './credential';
import errorMessage from './errorMessage';
import photo from './photo';
import followSuggestion from './followSuggestion';
import timeline from './timeline';

const rootReducer = combineReducers({
  credential,
  errorMessage,
  photo,
  followSuggestion,
  timeline,
  routing: routerReducer
});

export default rootReducer;
