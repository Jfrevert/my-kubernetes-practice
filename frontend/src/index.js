import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationList from './ApplicationList/ApplicationList'
import Header from './Header/Header'
import NavBar from './NavBar/NavBar'
import App from './App/App'
import './index.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
