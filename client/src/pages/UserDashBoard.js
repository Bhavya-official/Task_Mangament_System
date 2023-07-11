import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import Task from '../Components/Task'
import AddTask from '../Components/AddTask'
import EditTask from '../Components/EditTask'

function UserTasks() {
    
    const history = useHistory()
    const [message, setMessage] = useState("")
    const [toDoTask, setToDo] = useState([])
    const [inProgressTask, setInProgress] = useState([])
    const [completedTask, setCompleted] = useState([])
    const [seen, setSeen] = useState(false)
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        dueDate: Date.now()
    })
    
    async function populateTask() {
        if (localStorage.getItem("token")) {
            console.log(",lnbjbj")
            history.push('/login')
            return
        }
        const req = await fetch(`${process.env.REACT_APP_BASE_URL}/api/mytask`, {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
        
		if (data.status === 'ok') {
            setToDo(data.tasks.filter(a => a.status == 'To Do'))
            setInProgress(data.tasks.filter(a => a.status == 'In Progress'))
            setCompleted(data.tasks.filter(a => a.status == 'Completed'))
		} else {
            history.push("/login")
			alert(data.error)
		}

        return data
    }

    useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {
                populateTask()
            }
		}
	}, [])
    
    const logOut = () => {
        localStorage.removeItem("token")
        history.push('/login')
    }

    const handleDelete = async(e) => {
        const id = e.target.getAttribute("data-id")
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/deletetask`, {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_id: id,
            })
        })
        const data = await response.json()
        
        if (data.status !== 'ok') {
            alert("Something went wrong")
        } else {
            setToDo(toDoTask.filter(x => x._id != id))
            setInProgress(inProgressTask.filter(x => x._id != id))
            setCompleted(completedTask.filter(x => x._id != id))
            alert("Delete Successfully")
        }
    }

    return (
        <div>
            <nav class="navbar navbar-expand-sm navbar-light bg-dark">
              <a class="navbar-brand text-primary m-4" href="#">Task Management System</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse " id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link text-warning" onClick={logOut} href="#">LogOut </a>
                  </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">Add Task</button>
                </form>
              </div>
            </nav>
            <AddTask populate={populateTask} />
            <div className='container mt-5 '>
                <div className='row'>
                    <div className='col col-lg-3 m-2'>
                        <h1 className="status-container mb-3">To Do</h1>
                        {toDoTask.map(t => (
                            <div key={Math.random()}>
                                <EditTask task={t} populate={populateTask} key={Math.random()}/>
                                <Task task={t} onDelete={handleDelete} />
                            </div>
                        ))}
                    </div>
                    <div className='col col-lg-3 m-2'>
                        <h1 className="status-container mb-3">In Progress</h1>
                        {inProgressTask.map(t => (
                            <div>
                                <EditTask task = {t} populate={populateTask} />
                                <Task task={t} onDelete={handleDelete} />
                            </div>
                        ))}
                    </div>
                    <div className='col col-lg-3 m-2'>
                        <h1 className="status-container mb-3">Completed</h1>
                        {completedTask.map(t => (
                            <div>
                                <EditTask task = {t} populate={populateTask} />
                                <Task task={t} onDelete={handleDelete} />
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default UserTasks 
