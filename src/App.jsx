import React, { useState } from 'react';

import { auth } from './firebaseConfig';

import { Header } from './components/Header';

import AuthHeader from './components/AuthHeader';

import TodoApp from './TodoApp';

import './App.css';

function App() {
  const user = auth.currentUser;

  const [loggedIn, setLoggedIn] = useState();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <div className="todo-app">
      <AuthHeader user={user} loggedIn={loggedIn} />

      <div className="container">
        <div className="app-wrapper">
          <div>
            <Header user={user} loggedIn={loggedIn} />
          </div>
          <div>
            <TodoApp loggedIn={loggedIn} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { App };
