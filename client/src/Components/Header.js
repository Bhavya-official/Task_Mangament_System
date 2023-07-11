function Header() {
    return `
    <div class="w-auto m-auto d-flex table-responsive table-container">
    <table class="table align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr>
          <th></th>
          <th>Task Title</th>
          <th>Description</th>
          <th>Created By</th>
          <th>Status</th>
          <th>Assignee</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody id="tableBody">
      </tbody>
    </table>
    </div>
    `
  }


export default Header