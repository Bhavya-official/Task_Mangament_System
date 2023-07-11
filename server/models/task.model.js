const mongoose = require('mongoose')
const assignes = ["Shin", "John", "Mihir", "Kirti", "Shweta", "Bhavya"]

const Task = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true},
		due_date: { type: Date, required: true },
        create_date: { type: Date, required: true },
        status: { type: String, enum: ['To Do', 'In Progress', 'Completed'] },
        assignee: { type: String, enum: assignes },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData'}
	},
	{ collection: 'task-data' }
)

const model = mongoose.model('UserTask', Task)

module.exports = model
