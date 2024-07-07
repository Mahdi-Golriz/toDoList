import { useState } from "react";

export default function Form({
  tasks,
  setTasks,
  sortBy,
  setSortBy,
  onClearTasks,
}) {
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("1");
  const [taskDetails, setTaskDetails] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskDescription) return;

    const taskObject = {
      id: Date.now(),
      taskDescription,
      priority,
      taskDetails,
      isDone: false,
      selected: false,
    };
    setTasks([...tasks, taskObject]);

    setTaskDescription("");
    setTaskDetails("");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="task"
          placeholder="Main activity..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="1">First priority</option>
          <option value="2">Less important</option>
          <option value="3">Not so important</option>
        </select>

        <textarea
          rows="5"
          cols="30"
          maxLength="200"
          value={taskDetails}
          onChange={(e) => setTaskDetails(e.target.value)}
          placeholder="Description..."
        />

        <button>Add</button>
      </form>
      <div className="sort">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sorted by Input value</option>
          <option value="status">Sorted by Status</option>
          <option value="priority">Sorted by Priority</option>
        </select>
        <button onClick={onClearTasks}>Clear All</button>
      </div>
    </div>
  );
}
