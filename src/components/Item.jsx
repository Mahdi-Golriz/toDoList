export default function Item({
  taskObj,
  onDeleteTask,
  onStatusTask,
  onSelectTask,
}) {
  const {
    id,
    isTaskRowSelected,
    isDone,
    taskTitle,
    taskPriority,
    taskDetails,
  } = taskObj;

  return (
    <>
      <li
        onClick={() => onSelectTask(id)}
        className={isTaskRowSelected ? "isTaskRowSelected" : ""}
      >
        <span className={isDone ? "active" : ""}>{taskTitle}</span>
        <span>{taskPriority}</span>
        <input
          type="checkbox"
          onClick={() => onStatusTask(id)}
          value={isDone}
          disabled={isDone}
        />
        <button
          onClick={() => onDeleteTask(id)}
          className={isTaskRowSelected ? "isTaskRowSelected" : ""}
        >
          ❌
        </button>
      </li>
      {isTaskRowSelected && (
        <div className="details">
          <h4>Task details</h4>

          <p>{!taskDetails ? "There is no details to show" : taskDetails}</p>
        </div>
      )}
    </>
  );
}
