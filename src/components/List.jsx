export default function List({ children }) {
  return (
    <div className="list">
      <table>
        <thead>
          <tr className="headerRow">
            <th scope="col" className="col-70">
              Title
            </th>
            <th scope="col" className="col-10">
              Priority
            </th>
            <th scope="col" className="col-10">
              Status
            </th>
            <th scope="col" className="col-10">
              Delete
            </th>
            <th scope="col" className="col-10">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
