export default function Header() {
  return (
    <header>
      <h1>To do list</h1>
      <p>{new Date().toDateString()}</p>
    </header>
  );
}
