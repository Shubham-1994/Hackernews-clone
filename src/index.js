import React from 'react'
import ReactDOM from 'react-dom'
import { configStore } from '../src/store/store';
import { Provider } from 'react-redux'
import App from './App'
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';


const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent; /* For some Androids */
  }

  @import url('https://rsms.me/inter/inter.css');
  html {
    font-family: 'Inter', sans-serif;
  }
  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter var', sans-serif;
    }
  }
`;

// // Grab the state from a global variable injected into the server-generated HTML
// const preloadedState = window.__PRELOADED_STATE__;

// // Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

// // Create Redux store with initial state
// const store = createStore(NewsReducer, preloadedState);
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


  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  // serviceWorker.unregister();
}
else {
  console.log("ENTERED INDEX COMP SERVER");
}