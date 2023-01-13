import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  where,
  query,
  setDoc,
} from 'firebase/firestore';

import { db } from './firebaseConfig';

import AddTodo from './components/Todos/AddTodo';
import TodoList from './components/Todos/TodoList';

function TodoApp({ loggedIn, user }) {
  console.log(loggedIn, user?.uid);

  const initialState = JSON.parse(localStorage.getItem('todos')) || [];

  console.log('initialState', initialState);

  const [todos, setTodos] = useState(loggedIn ? [] : initialState);

  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    if (loggedIn) {
      if (user?.uid) {
        const q = query(
          collection(db, 'todos'),
          where('userId', '==', user.uid)
        );
        onSnapshot(q, (snapshot) => {
          const todoData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTodos(todoData);
          localStorage.setItem('todos', JSON.stringify([]));
        });
      }
    } else {
      console.log('clear');
      if (initialState?.length > 0) {
        setTodos(initialState);
      } else {
        setTodos([]);
        localStorage.setItem('todos', JSON.stringify([]));
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn && !user?.uid) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const onAdd = async (val) => {
    console.log('add');
    const todoId = uuidv4();

    const payload = {
      id: todoId,
      title: val,
      completed: false,
    };

    if (!val) {
      return;
    }

    setTodos((prevTodos) => [...prevTodos, payload]);

    if (loggedIn) {
      const docRef = doc(db, 'todos', todoId);
      await setDoc(docRef, {
        title: val,
        completed: false,
        userId: user?.uid ?? '',
      });
    }
  };

  const onComplete = async (check, id) => {
    const itemList = todos.map((e) => {
      if (e.id === id) {
        const updateTodoTemp = {
          ...e,
          completed: !e.completed,
        };

        return updateTodoTemp;
      } else {
        return e;
      }
    });

    setTodos(itemList);

    if (loggedIn) {
      await updateDoc(doc(db, 'todos', id), {
        completed: !check,
      });
    }
  };

  const onEdit = (todo) => {
    setCurrentTodo(todo);
  };

  const onUpdate = async (id, val) => {
    const itemList = todos.map((e) => {
      if (e.id === id) {
        const updateTodoTemp = {
          ...e,
          title: val,
        };

        return updateTodoTemp;
      } else {
        return e;
      }
    });

    setTodos(itemList);

    setCurrentTodo({});

    if (loggedIn) {
      await updateDoc(doc(db, 'todos', id), {
        title: val,
      });
    }
  };

  const onDelete = async (id) => {
    const itemList = todos.filter((e) => e.id !== id);

    setTodos(itemList);

    if (loggedIn) {
      await deleteDoc(doc(db, 'todos', id));
    }
  };

  return (
    <div>
      <AddTodo onAdd={onAdd} currentTodo={currentTodo} onUpdate={onUpdate} />
      <TodoList
        todos={todos}
        onEdit={onEdit}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    </div>
  );
}

export default TodoApp;
