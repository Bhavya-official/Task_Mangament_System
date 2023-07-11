import * as d3 from "d3"
import Header from "../Components/Header"
import TableBody from "../Components/TableBody"
import { useHistory } from "react-router-dom";

function AdminDashBoard() {
  const history = useHistory()
  var tasks = []
  const getData = async () => {
    const req = await fetch("http://localhost:1337/api/admindashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    try {
      const data = await req.json();
      
      if(data.status === 'error') {
        alert(JSON.stringify(data.error))
        history.push('/login')
        return
      }

      tasks = await data.tasks
      d3.select("#root").html(Header)
      d3.select("#root").insert('div', ":first-child").html(selectHtml)
      handleTableBody(data.tasks)
      d3.selectAll('a').on('click', (e) => {
        handleDelete(e)
      })

      d3.select('#sortSelect').on('change', (e) => {
        if (e.target.value === "") {
          getData()
        }
        tasks.sort((a,b) => {
          return d3.ascending(a[e.target.value], b[e.target.value]) 
        })
        handleTableBody(tasks)
      })

  
      d3.select('#search').on('change', (e) => {
        const filter = tasks.filter(task => {
          return (
            task.title.includes(e.target.value) ||
            task.description.includes(e.target.value)
          )
        })
        handleTableBody(filter)
      })

      d3.select("#filter").on('click', (e) => {
        const checkedInput = d3.selectAll('.form-check-input:checked').nodes()
        const checkedInputValue = checkedInput.map((t) => (t.value))
        
        var filterTasks = tasks.filter(t => {
          return checkedInputValue.includes(t.status)
        })
        
        const assignee = d3.select('#assignee').node().value
        if (assignee !== "Choose...") {
          filterTasks = filterTasks.filter(t => {
            return t.assignee == assignee
          })
        }

        const user = d3.select('#user').node().value
        if (user != '') {
          filterTasks = filterTasks.filter(t => {
            return user == t.user.name
          })
        }

        const fromDate = d3.select('#from').node().value
        
        if (fromDate != '') {
          filterTasks = filterTasks.filter(t => {
            return Date(t.due_date) > Date(fromDate)
          })
        }

        const toDate = d3.select('#from').node().value
        if (toDate != '') {
          filterTasks = filterTasks.filter(t => {
            return Date(t.due_date) < Date(toDate)
          })
        }

        handleTableBody(filterTasks)
      })

    } catch(err) {
      alert(err)
    }
  };

  const handleTableBody = (data) => {
    const selection = d3.select("#tableBody")
    selection.selectAll('tr').remove()

    selection.selectAll('tr')
      .data(data)
      .enter()
      .append('tr')
      .html(TableBody)
  }
  
  const handleDelete = async (e) => {
    const id = e.target.getAttribute("data-id")
    
    const response = await fetch('http://localhost:1337/api/deletetask', {
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
    getData()
  }
  
  function selectHtml() {
    return `
    <div class="action-btn-cont">
    <select id="sortSelect" class="form-select sort-dropdown" name="sortBy">
    <option selected value=''>Sort By</option>
    <option value="create_date">Creation Date</option>
    <option value="due_date">Due Date</option>
    </select>

    <input name="search" id="search" class="search-btn" placeholder="Search"/> 
    <button class="btn btn-primary filter-btn" data-bs-toggle="modal" data-bs-target="#myModal"> <i class="fa fa-regular fa-sm fa-filter"></i> Filter</button>

    <div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Filters</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" value="To Do" id="toDo">
      <label class="form-check-label" for="toDo">
        To Do
      </label>
      </div>
      <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" value="In Progress" id="inProgress">
      <label class="form-check-label" for="inProgress">
        In Progress
      </label>
      </div>
      <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" value="Completed" id="completed">
      <label class="form-check-label" for="completed">
        Completed
      </label>
      </div>
      <div class="mt-3 mb-3">
        <label class="form-check-label" for="assignee" >Assigne to</label>
        <div class="form-check form-check-inline">
            <select id="assignee" class="form-select form-select-sm" onChange={handleChange} name="assignee" value={inputs.assignee} aria-label=".form-select-sm example" required>
                <option selected>Choose...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
        </div>
      </div>
      <div class="form-group form-check-inline d-flex">
        <label class="form-check-label" for="user" >Created By</label>
        <input type="text" class="form-control form-control-sm" name="createUser" id="user"/>
      </div>
      <div class="form-group">
        <label class="form-check-label mb-2 mt-2">Due Date</label>
        <div>
          <label class="form-check-label" >From</label>
          <input type="date" id="from" class="date ml-2">
        </div>
        <div class="mt-2">
          <label class="form-check-label" >To</label>
          <input type="date" id="to" class="date ml-2">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="filter">Apply Filter</button>
      </div>
    </div>
  </div>
</div>
</div>
    `
  }
  

  getData();
  
  return (
    <div>
  </div>
  ) ;
  
 
}


export default AdminDashBoard
