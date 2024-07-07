export default function Item({
  taskObj,
  onDeleteTask,
  onStatusTask,
  onSelectTask,
}) {
  const { id, selected, isDone, taskDescription, priority, taskDetails } =
    taskObj;

  return (
    <>
      <li
        onClick={() => onSelectTask(id)}
        className={selected ? "selected" : ""}
      >
        <span className={isDone ? "active" : ""}>{taskDescription}</span>
        <span>{priority}</span>
        <input
          type="checkbox"
          onClick={() => onStatusTask(id)}
          value={isDone}
          disabled={isDone}
        />
        <button
          onClick={() => onDeleteTask(id)}
          className={selected ? "selected" : ""}
        >
          ❌
        </button>
      </li>
      {selected && (
        <div className="details">
          <h4>Task details</h4>

          <p>{!taskDetails ? "There is no details to show" : taskDetails}</p>
        </div>
      )}
    </>
  );
}
