
import { combineReducers } from 'redux';
import serviceReducer from '../src/components/reducer/serviceReducer';

const rootReducer = combineReducers({
  services: serviceReducer,
});

export default rootReducer;