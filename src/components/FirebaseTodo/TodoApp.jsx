import { useState, useEffect, useId } from 'react';

import { v4 as uuidv4, v4 } from 'uuid';

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

import { db, auth } from '../../firebaseConfig';

import AddTodo from './AddTodo';
import TodoList from './TodoList';

const Todos = collection(db, 'todos');

function TodoApp({ todos, setTodos }) {
  const user = auth.currentUser;

  const [currentTodo, setCurrentTodo] = useState({});

  const onAdd = async (val) => {
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

    const docRef = doc(db, 'todos', todoId);

    await setDoc(docRef, {
      title: val,
      completed: false,
      userId: user?.uid ?? '',
    });

    // await addDoc(Todos, {
    //   title: val,
    //   completed: false,
    //   userId: user?.uid ?? '',
    // });
  };

  const onComplete = async (completed, id) => {
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

    await updateDoc(doc(db, 'todos', id), {
      completed: !completed,
    });

    setTodos(itemList);
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

    await updateDoc(doc(db, 'todos', id), {
      title: val,
    });

    setCurrentTodo({});
  };

  const onDelete = async (id) => {
    const itemList = todos.filter((e) => e.id !== id);

    setTodos(itemList);

    await deleteDoc(doc(db, 'todos', id));
  };

  // console.log(todos);

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
