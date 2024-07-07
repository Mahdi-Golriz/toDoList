export default function Header() {
  return (
    <header className="main_header">
      <span className="app_title">To do list</span>
      <span className="current_date">{new Date().toDateString()}</span>
    </header>
  );
}
