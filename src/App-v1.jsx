import { useState } from "react";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [sortBy, setSortBy] = useState("input");
  // const [tasks, setTasks] = useState([]);
  const [tasks, setTasks] = useLocalStorageState([], "tasks");
  let sortedTasks;

  function handleDeleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function handleStatusTask(id) {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, isDone: true } : task))
    );
  }

  function handleSelectTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, selected: true }
          : { ...task, selected: false }
      )
    );
  }

  function handleClearTasks() {
    setTasks([]);
  }

  if (sortBy === "input") sortedTasks = tasks;
  if (sortBy === "status")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => Number(a.isDone) - Number(b.isDone));

  if (sortBy === "priority")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => Number(a.priority) - Number(b.priority));

  return (
    <div className="container">
      <Header />
      <Form
        tasks={tasks}
        setTasks={setTasks}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onClearTasks={handleClearTasks}
      />
      {/* <List
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onStatusTask={handleStatusTask}
        onSelectTask={handleSelectTask}
        sortedTasks={sortedTasks}
      /> */}
      <List>
        {sortedTasks.map((task) => (
          <Item
            taskObj={task}
            key={task.id}
            onDeleteTask={handleDeleteTask}
            onStatusTask={handleStatusTask}
            onSelectTask={handleSelectTask}
          />
        ))}
      </List>
      <Footer tasks={tasks} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>To do list</h1>
      <p>{new Date().toDateString()}</p>
    </header>
  );
}

function Form({ tasks, setTasks, sortBy, setSortBy, onClearTasks }) {
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

function List({ children }) {
  return (
    <main className="list">
      <ul>
        <li className="headerRow">
          <span>Main activity</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Delete</span>
        </li>
        {children}
      </ul>
    </main>
  );
}

function Item({ taskObj, onDeleteTask, onStatusTask, onSelected }) {
  const { id, selected, isDone, taskDescription, priority, taskDetails } =
    taskObj;

  return (
    <>
      <li onClick={() => onSelected(id)} className={selected ? "selected" : ""}>
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

function Footer({ tasks }) {
  const isDoneTasks = tasks.filter((task) => task.isDone === true).length;
  const totallTasks = tasks.length;

  if (!totallTasks)
    return <p className="footer">Start to add your daily tasks 🙂</p>;

  return (
    <footer className="footer">
      {isDoneTasks < totallTasks
        ? `You have done ${isDoneTasks} activity of your ${totallTasks} daily goals`
        : "You have done all your goals 🎉"}
    </footer>
  );
}
