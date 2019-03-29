import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList/TodoList'
import Header from './Header/Header'
import './index.css'


import * as serviceWorker from './serviceWorker';

//foo={"bard"} will become props.foo in the code of the component
ReactDOM.render(
    <div>
        <Header />
        <TodoList />
    </div>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
