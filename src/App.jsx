import React, { useState, useEffect } from 'react';

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  getDoc,
  doc,
  onSnapshot,
  updateDoc,
  where,
  query,
  setDoc,
} from 'firebase/firestore';

import { auth } from './firebaseConfig';

import { Header } from './components/Header';

import AuthHeader from './components/AuthHeader';

import TodoApp from './components/FirebaseTodo/TodoApp';

import './App.css';

function App() {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];

  const user = auth.currentUser;

  const [loggedIn, setLoggedIn] = useState();

  const [todos, setTodos] = useState([]);

  auth.onAuthStateChanged((user) => {
    // console.log(user);
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  useEffect(() => {
    if (loggedIn !== undefined) {
      //do loggedIn stuff
    }

    if (user?.uid) {
      const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
      onSnapshot(q, (snapshot) => {
        const todoData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTodos(todoData);
      });
    } else {
      setTodos([]);
    }
  }, [loggedIn]);

  return (
    <div className="todo-app">
      <AuthHeader user={user} loggedIn={loggedIn} />

      <div className="container">
        <div className="app-wrapper">
          <div>
            <Header user={user} loggedIn={loggedIn} />
          </div>
          <div>
            <TodoApp todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { App };
