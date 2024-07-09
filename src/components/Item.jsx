export default function Item({
  taskObj,
  handleDeleteTask,
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
      <tr onClick={() => onSelectTask(id)}>
        <td className={`col-70 ${isDone ? "active" : ""}`}>{taskTitle}</td>
        <td className="col-10">{taskPriority}</td>
        <td className="col-10">
          <input
            type="checkbox"
            onClick={(e) => onStatusTask(e, id)}
            value={isDone}
            // disabled={isDone}
          />
        </td>
        <td className="col-10">
          <button onClick={() => handleDeleteTask(id)}>❌</button>
        </td>
      </tr>
      <tr className="row-spacing">
        {isTaskRowSelected && (
          <td colSpan="4" className="full-width">
            {!taskDetails
              ? "There is no description for this task"
              : taskDetails}
          </td>
        )}
      </tr>
    </>
  );
}
