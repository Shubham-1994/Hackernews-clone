import React from 'react'
import ReactDOM from 'react-dom'
import { configStore } from '../src/store/store';
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


if (__IS_BROWSER__) {

  const { INITIAL_STORE_STATE: initialStoreState = {} } = window;
  delete window.INITIAL_STORE_STATE;
  const store = configStore(initialStoreState);
  ReactDOM.hydrate(
    <BrowserRouter>
      <Provider store={store}>          
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  )

  serviceWorker.register();
}