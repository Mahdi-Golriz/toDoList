export default function List({ children }) {
  return (
    <main className="list">
      <ul>
        <li className="headerRow">
          <span>Title</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Action</span>
        </li>
        {children}
      </ul>
    </main>
  );
}
