export default function Footer({ tasks }) {
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
