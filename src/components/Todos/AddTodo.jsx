import { useState, useEffect } from 'react';

function AddTodo({ onAdd, currentTodo, onUpdate }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  useEffect(() => {
    if (currentTodo.id) {
      setValue(currentTodo.title);
    }

    return () => {
      setValue('');
    };
  }, [currentTodo?.id]);

  const onSave = (e) => {
    e.preventDefault();

    // if (value) {
    //   onAdd(value);
    //   setValue('');
    // }

    if (!value) {
      return;
    }

    if (currentTodo.id) {
      onUpdate(currentTodo.id, value);
    } else {
      onAdd(value);
    }

    setValue('');
  };

  return (
    <div className="addTodo">
      <form onSubmit={onSave}>
        <input
          type="text"
          name="title"
          value={value}
          onChange={handleChange}
          className="task-input"
        />
        <button className="button-add" type="submit">
          {currentTodo?.id ? 'Edit' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
