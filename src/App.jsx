// libraries
import { useState } from "react";

// hooks
import { useLocalStorageState } from "./hooks/useLocalStorageState";

// components
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Item from "./components/Item";
import Footer from "./components/Footer";
import { taskSortKeys, taskSortValues } from "./configs/taskConfig";

export default function App() {
  // local states
  const [sortCriteria, setSortCriteria] = useState(
    taskSortValues[taskSortKeys.INPUT]
  );
  const [tasks, setTasks] = useLocalStorageState([], "tasks");

  let sortedTasks;

  // handlers
  function handleDeleteTask(id) {
    setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
  }

  function handleTaskDone(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? task.isDone
            ? { ...task, isDone: false }
            : { ...task, isDone: true }
          : task
      )
    );
  }

  function handleRowSelection(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? task.isTaskRowSelected
            ? { ...task, isTaskRowSelected: false }
            : { ...task, isTaskRowSelected: true }
          : { ...task, isTaskRowSelected: false }
      )
    );
  }

  function handleClearTasks() {
    setTasks([]);
  }

  if (sortCriteria === taskSortValues[taskSortKeys.INPUT]) {
    sortedTasks = tasks;
  }

  if (sortCriteria === taskSortValues[taskSortKeys.STATUS]) {
    sortedTasks = structuredClone(tasks).sort(
      (a, b) => Number(a.isDone) - Number(b.isDone)
    );
  }

  if (sortCriteria === taskSortValues[taskSortKeys.PRIORITY])
    sortedTasks = tasks
      .slice()
      .sort((a, b) => Number(a.priority) - Number(b.priority));

  return (
    <>
      <main className="container">
        <Header />
        <Form
          tasks={tasks}
          setTasks={setTasks}
          sortCriteria={sortCriteria}
          setSortCriteria={setSortCriteria}
          clearTask={handleClearTasks}
        />
        <List>
          {sortedTasks.map((task) => (
            <Item
              taskObj={task}
              key={task.id}
              handleDeleteTask={handleDeleteTask}
              onStatusTask={handleTaskDone}
              onSelectTask={handleRowSelection}
            />
          ))}
        </List>
        <Footer tasks={tasks} />
      </main>
    </>
  );
}
