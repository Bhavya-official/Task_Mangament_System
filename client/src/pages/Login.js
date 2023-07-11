import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Jwt } from 'jsonwebtoken'

function App() {
	const history = useHistory()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			
			if (JSON.parse(atob(data.user.split('.')[1])).email == 'admin@gmail.com') {
				history.push('/admindashboard')
				return
			}
			history.push('/mytask')
		} else {
			alert('Please check your username and password')
		}
	}

	return (
	<section className="" >
		<div className="container h-100">
		  <div className="row d-flex justify-content-center align-items-center h-100">
			<div className="col-lg-12 col-xl-11">
			  <div className="card text-black">
				<div className="card-body p-md-5">
				  <div className="row justify-content-center">
					<div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
	  
					  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4">Log In</p>
	  
					  <form className="mx-1 mx-md-4" onSubmit={loginUser}>
	  
						<div className="d-flex flex-row align-items-center mb-4">
						  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
						  <div className="form-outline flex-fill mb-0">
							<input type="email" className="form-control" value={email}
							  onChange={(e) => setEmail(e.target.value)}	placeholder="Email" required/>
							<label className="form-label">Your Email</label>
						  </div>
						</div>
	  
						<div className="d-flex flex-row align-items-center mb-4">
						  <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
						  <div className="form-outline flex-fill mb-0">
							<input type="password" className="form-control" value={password}
							  onChange={(e) => setPassword(e.target.value)}  placeholder="Password" required/>
							<label className="form-label">Password</label>
						  </div>
						</div>
	  
						<div className="form-check d-flex justify-content-center mb-2">
						  <p className="form-check-label">
							Not a User ? <a class="link-danger" onClick={() => history.push('/register')}>Register</a>
						  </p>
						</div>
	  
						<div className="d-flex justify-content-center mx-2 mb-lg-4">
						  <button type="submit" class="btn btn-primary" >Login</button>
						</div>
	  
					  </form>
	  
					</div>
					<div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
	  
					  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
						className="img-fluid" alt="Sample image" />
	  
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </section>
	)
}

export default App
