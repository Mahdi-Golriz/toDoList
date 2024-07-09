import { useState } from "react";
import { taskPriorities, taskPrioritiesKeys } from "../configs/taskConfig";

export default function Item({
  taskObj,
  handleDeleteTask,
  onStatusTask,
  onSelectTask,
  handleEditTask,
  setTasks,
}) {
  const {
    id,
    isTaskRowSelected,
    isDone,
    taskTitle,
    taskPriority,
    taskDetails,
    isEditFormShowed,
  } = taskObj;

  const [newTitle, setNewTitle] = useState(taskTitle);
  const [newDetails, setNewDetails] = useState(taskDetails);
  const [newPriority, setNewPriority] = useState(taskPriority);

  function handleEditFormSubmit(e) {
    e.preventDefault();

    if (!newTitle) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              taskTitle: newTitle,
              taskPriority: newPriority,
              taskDetails: newDetails,
            }
          : task
      )
    );

    handleEditTask(e, id);
  }

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
        <td className="col-10">
          <button onClick={(e) => handleEditTask(e, id)}>✏️</button>
        </td>
      </tr>
      <tr className="row-spacing">
        {isTaskRowSelected && (
          <td colSpan="5" className="full-width">
            {!taskDetails
              ? "There is no description for this task"
              : taskDetails}
          </td>
        )}
      </tr>
      <tr className="row-spacing">
        {isEditFormShowed && (
          <td colSpan="5" className="edit-form">
            <form onSubmit={handleEditFormSubmit} className="edit">
              <input
                type="text"
                placeholder="New Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
              >
                <option value={taskPriorities[taskPrioritiesKeys.HIGH]}>
                  {taskPrioritiesKeys.HIGH}
                </option>
                <option value={taskPriorities[taskPrioritiesKeys.MEDIUM]}>
                  {taskPrioritiesKeys.MEDIUM}
                </option>
                <option value={taskPriorities[taskPrioritiesKeys.LOW]}>
                  {taskPrioritiesKeys.LOW}
                </option>
              </select>
              <textarea
                rows="1"
                cols="30"
                maxLength="200"
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
                placeholder="Task Description"
              />
              <button>Edit</button>
            </form>
          </td>
        )}
      </tr>
    </>
  );
}
