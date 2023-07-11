// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Task = require('./models/task.model')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/full-mern-stack-video')

app.post('/api/register', async (req, res) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/api/mytask', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email }).populate('tasks').exec()
		
		res.json({ status: 'ok', tasks: user.tasks })
	} catch (error) {
		res.json({ status: 'error', error: error})
	}

})

app.post('/api/addtask', async (req, res) => {
	const token = req.headers['x-access-token']
	
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({
			email: email
		})
		const task = await Task.create( {
			title: req.body.data.title,
			description: req.body.data.description,
			create_date: new Date(Date.now()),
			due_date: req.body.data.dueDate,
			status: req.body.data.status,
			assignee: req.body.data.assignee,
			user: user._id
		}
		)
		
		await User.updateOne(
			{ email: email },
			{ $push: { tasks: task._id } }
		)

		res.json({ status: 'ok' })
	} catch (error) {
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post("/api/deletetask", async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const task_id = req.body.task_id

		await Task.deleteOne(
			{ _id:task_id }
		)

		await User.updateOne(
			{email: email},
			{$pullAll: {tasks: [task_id]}}
		)

		res.json({status:'ok', message:'Deleted Successfully'})
	} catch (error) {
		res.json({ status: 'error', error: error })
	}
})

app.put("/api/edittask", async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const task_id = req.body.task_id
		const task = await Task.updateOne(
			{ _id: task_id},
			{$set: {
				title: req.body.data.title,
				description: req.body.data.description,
				due_date: req.body.data.dueDate,
				status: req.body.data.status,
				assignee: req.body.data.assignee
				}
			}
		)
		return res.json({status: "ok", message: "Update Successfully"}) 
	} catch (error) {
		res.json({status: 'error', error: error}) 
	}
}) 

app.get("/api/admindashboard", async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		let response = {}
		if (email == "admin@gmail.com") {
			const tasks = await Task.find().populate("user").exec()
			response = {status: "ok", tasks: tasks}
		} else {
			response = {status: 'error', error: 'Not Authorized'}
		}
		res.json(response)

	} catch (err) {
		res.json({status: 'error', error: err})
	}
})


app.listen(1337, () => {
	console.log('Server started on 1337')
})
