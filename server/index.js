import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { NewsReducer } from '../src/store/reducers/reducer';
import App from '../src/App';
import { fetchData } from '../src/utility/helper';
import { StaticRouter } from 'react-router';

const app = express();
const port = process.env.port || 3000;
//Serve static files
app.use(express.static('public'));

// This is fired every time the server side receives a request
app.get('*', handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // Query our mock API asynchronously
  fetchData(apiResult => {
    const context={};
    // console.log("Api result", apiResult);
    // Compile an initial state
    let preloadedState = { apiResult }

    // Create a new Redux store instance
    const store = createStore(NewsReducer, preloadedState.apiResult, applyMiddleware(thunk));
    // loadData(store);
    const sheet = new ServerStyleSheet();
    // Render the component to a string
    const html = renderToString(
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <StyleSheetManager sheet={sheet.instance}>
            <App />
          </StyleSheetManager>
        </Provider>
      </StaticRouter>
    )

    const styles = sheet.getStyleTags();
    // Grab the initial state from our Redux store
    const finalState = store.getState();
    // console.log("Final State", finalState);
    // Send the rendered page back to the client
    res.set('Cache-Control', 'public, max-age=6000');
    res.send(renderFullPage(html, styles, finalState))
  })
}
function renderFullPage(html, styles, finalState) {
  return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="Description" content="Hackernews">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hackernews</title>
        ${styles}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.INITIAL_STORE_STATE = ${JSON.stringify(finalState)}
        </script>
        <script src="c-bundle.js" defer></script>
      </body>
    </html>
    `
}

app.listen(port , ()=>console.log("Server is listening at", port));