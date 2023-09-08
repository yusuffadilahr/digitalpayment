import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import rootReducer from './rootReducer'; 
import App from './App';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);