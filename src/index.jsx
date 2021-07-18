import React from 'react';
import "./styles/index.css";
import App from './App';
import ReactDOM from 'react-dom';

// render to the dom

ReactDOM.render(<App />, document.getElementById('root'));


// register the service worker when a user opens our app

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}