import { useState } from "react";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Item from "./components/Item";
import Footer from "./components/Footer";

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
          ? task.selected
            ? { ...task, selected: false }
            : { ...task, selected: true }
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
