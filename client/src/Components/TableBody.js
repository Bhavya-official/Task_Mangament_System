function TableBody(data) {

  const options = {
    'day': 'numeric',
    'month': 'short',
    'year': '2-digit'
  }

  const getStatusColor = (status) => {
    return status == 'Completed'?'success': status == 'To Do'? 'secondary': 'warning'
  }

  
  
  return `
      <td class="text-center">
        <a ><i data-id=${data._id} class="fa fa-trash fa-xs trash-icon mr-2"></i></a>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <div class="ms-3">
            <p class="fw-bold mb-1">${data.title}</p>
          </div>
        </div>
      </td>
      <td>
        <p class="text-muted mb-0 small">${data.description}</p>
      </td>
      <td>
      <p class="fw-bold mb-1">${data.user.name}</p>
      <p class="text-muted mb-0 small">${new Date(data.create_date).toLocaleDateString('en-us', options)}</p>
      </td>
      <td>
        <span class="badge text-bg-${getStatusColor(data.status)} rounded-pill d-inline">${data.status}</span>
      </td>
      <td>${data.assignee}</td>
      <td>
        <button type="button" class="btn btn-danger btn-sm rounded-pill">
        ${new Date(data.due_date).toLocaleDateString('en-us', options)}
        </button>
        </td>
        `
}

export default TableBody