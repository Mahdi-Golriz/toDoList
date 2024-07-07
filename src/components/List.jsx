export default function List({ children }) {
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
