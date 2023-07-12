import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import UserTasks from './pages/UserDashBoard'
import AdminDashBoard from './pages/AdminDashboard'

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/mytask" exact component={UserTasks} />
				<Route path="/admindashboard" exact component={AdminDashBoard} />
				<Redirect to="/login" />
			</BrowserRouter>
		</div>
	)
}

export default App
