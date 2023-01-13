function TodoItem({ todo, onEdit, onComplete, onDelete }) {
  const { id, title, completed } = todo;
  return (
    <div className="list-item">
      <input
        type="text"
        className={`list ${completed ? 'complete' : ''}`}
        // defaultValue={title}
        value={title}
        onChange={(e) => e.preventDefault()}
      />
      <div>
        <button
          className="button-complete task-button"
          onClick={() => onComplete(completed, id)}
        >
          <i className="fa fa-check-circle"></i>
        </button>
        <button
          className="button-edit task-button"
          onClick={() => onEdit(todo)}
        >
          <i className="fa fa-edit"></i>
        </button>
        <button
          className="button-delete task-button"
          onClick={() => onDelete(id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
