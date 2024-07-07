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
  const { tasks, setTasks, sortCriteria, setSortCriteria, clearTask } = props;

  // local states
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState(taskPriorities.HIGH);
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
      },
    ]);

    setTaskTitle("");
    setTaskDetails("");
  }

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
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

        <textarea
          rows="5"
          cols="30"
          maxLength="200"
          value={taskDetails}
          onChange={(e) => setTaskDetails(e.target.value)}
          placeholder="Task Description"
        />

        <button>Add New Task</button>
      </form>
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
  );
}
