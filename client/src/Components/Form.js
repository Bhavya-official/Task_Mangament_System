import { useState } from "react"

function Form({ populate, task, isUpdate, onHide}) {
    const [inputs, setInputs] = useState({
        title: task.title || '',
        description: task.description || '' ,
        dueDate: task.due_date || null,
        status: task.status || "",
        assignee: task.assignee || ""
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let response
        if (isUpdate) {
            response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/edittask`, {
			method: 'PUT',
			headers: {
                'x-access-token': localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data: inputs,
                task_id: task._id
			}),
		})    
        } else {
            response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/addtask`, {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: inputs
                }),
            })
        }
        

		if (response.status === 200) {
            onHide()
            document.querySelector('body').classList.remove('modal-open')
            populate()
            // const a = document.getElementsByClassName('modals-backdrop').remove()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class="form-floating mb-3">
              <input onChange={handleChange} type="text" name='title' value={inputs.title} class="form-control" id="title" placeholder=" " required/>
              <label for="title">Title</label>
            </div>
            <div class="form-floating mb-3">
              <textarea onChange={handleChange} class="form-control" name="description" value={inputs.description} placeholder="Description" id="descriptionInput"></textarea>
              <label for="DescriptionInput">Description</label>
            </div>
            <div className="mb-2">
                <label class="col-sm-2 col-form-label d-block">Status</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" onChange={handleChange} checked={inputs.status === "To Do"} type="radio" name="status" id="toDo" value="To Do" required/>
                    <label class="form-check-label" for="toDo">
                        To Do
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" onChange={handleChange} checked={inputs.status === "In Progress"} type="radio" name="status" id="inProgress" value="In Progress"/>
                    <label class="form-check-label" for="inProgress">
                        In Progress
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" onChange={handleChange} checked={inputs.status === "Completed"} type="radio" name="status" id="completed" value="Completed" />
                    <label class="form-check-label" for="completed">
                        Completed
                    </label>
                </div>
                <div className="mt-3 mb-3">
                    <label class="form-check-label" for="assignee" >Assigne to</label>
                    <div className="form-check form-check-inline">
                        <select class="form-select form-select-sm" onChange={handleChange} name="assignee" value={inputs.assignee} aria-label=".form-select-sm example" required>
                            <option selected>Choose...</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3 mb-3">
                    <label class="form-check-label" for="datePicker" >Due Date</label>
                    <div className="form-check form-check-inline">
                        <input type="date" onChange={handleChange} 
                        value={new Date(inputs.dueDate).toISOString().split('T')[0]} name="dueDate" id="datePicker" 
                        min={new Date().toISOString().split('T')[0]} required/>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
        
        </form>
    )
}

export default Form
