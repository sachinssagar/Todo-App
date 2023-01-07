import { useState, useEffect } from 'react';

import { v4 as uuidv4, v4 } from 'uuid';

import AddTodo from './AddTodo';
import TodoList from './TodoList';

function TodoApp() {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialState ?? []);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onAdd = (val) => {
    const payload = {
      id: uuidv4(),
      title: val,
      completed: false,
    };

    if (!val) {
      return;
    }

    setTodos((prevTodos) => [...prevTodos, payload]);
  };

  const onEdit = (todo) => {
    setCurrentTodo(todo);
  };

  const onUpdate = (id, val) => {
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
  };

  const onComplete = (id) => {
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
  };

  const onDelete = (id) => {
    const itemList = todos.filter((e) => e.id !== id);

    setTodos(itemList);
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
