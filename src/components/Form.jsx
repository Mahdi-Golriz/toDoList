// libraries
import { useState } from "react";

// configs
import {
  taskPriorities,
  taskPrioritiesKeys,
  taskSortKeys,
  taskSortValues,
} from "../configs/taskConfig";

export default function Form(props) {
  // props destructure
  const { setTasks, sortCriteria, setSortCriteria, clearTask } = props;

  // local states
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState(
    taskPriorities[taskPrioritiesKeys.HIGH]
  );
  const [taskDetails, setTaskDetails] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskTitle) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(), // string
        taskTitle, // string
        taskPriority, // string  "1" "2" "3"
        taskDetails, // string
        isDone: false, // boolean
        isTaskRowSelected: false, // boolean
        isEditFormShowed: false, // boolean
      },
    ]);

    setTaskTitle("");
    setTaskDetails("");
  }

  return (
    <div className="row">
      <form onSubmit={handleSubmit} className="form">
        <div className="column">
          <input
            type="text"
            id="task"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
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
        </div>
        <div className="column">
          <textarea
            rows="3"
            cols="30"
            maxLength="200"
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            placeholder="Task Description"
          />
        </div>

        <div className="column">
          <button>Add New Task</button>
        </div>
      </form>

      <div className="column">
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value={taskSortValues[taskSortKeys.INPUT]}>
            {taskSortKeys.INPUT}
          </option>
          <option value={taskSortValues[taskSortKeys.STATUS]}>
            {taskSortKeys.STATUS}
          </option>
          <option value={taskSortValues[taskSortKeys.PRIORITY]}>
            {taskSortKeys.PRIORITY}
          </option>
        </select>
        <button onClick={clearTask}>Clear All</button>
      </div>
    </div>
  );
}
