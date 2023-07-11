function Task ({ task, editHandle, onDelete }) {
    const options = {
        month: 'short',
        year: '2-digit',
        day: 'numeric'
    }
    
    return (
        <div className="mb-3">
            <div className="card">
              <div className="card-body">
                <div className="header">
                    <div>
                        <h5 className="card-title">{task.title}</h5>
                    </div>
                    <div className="icons">
                        <a onClick={editHandle} data-bs-toggle="modal" data-bs-target={`#b${task._id}`}><i data-id={task._id} className="fa fa-duatone fa-pen fa-sm edit-icon"></i></a>
                        <a onClick={onDelete} ><i data-id={task._id} className="fa fa-trash fa-sm trash-icon"></i></a>
                    </div>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">
                    {new Date(task.create_date).toLocaleDateString('en-us', options)}
                </h6>
                <p className="card-text w-75">{task.description}.</p>
                <a href="#" className="btn btn-primary btn-sm">{task.assignee}</a>
                <a href="#" className="btn btn-warning btn-sm">
                    <i className="fa fa-solid fa-clock"></i>
                    <strong>
                        {new Date(task.due_date).toLocaleDateString(undefined, options)}
                    </strong>
                </a>
              </div>
            </div>
        </div>
    )
}

export default Task