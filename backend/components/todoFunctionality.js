import Todo from "../models/TodoModel.js";

function addNewTask(req, res) {
	const data = req.body;

	const entry = new Todo(data);

	entry
		.save()
		.then((entry) => {
			return res.status(201).json({ message: "New Task Created", entry: entry });
		})
		.catch((error) => {
			console.log(error);

			if (error.name === "ValidationError") {
				return res.status(400).json({ errorMessage: "error occured while saving the item on the database (bad request)", error: error });
			}

			return res.status(500).json({ errorMessage: "Internal server error" });
		});
}

function updateStatus(req, res) {
	const id = req.params.id;
	// const completed = req.body.completed;

	Todo.findOneAndUpdate({ _id: id }, req.body, { new: true })
		.then((updatedEntry) => {
			if (updatedEntry === null) {
				return res.status(404).json({ errorMessage: "Task has not been created" });
			}
			return res.status(200).json({ message: "succsessful updation", updatedEntry: updatedEntry });
		})
		.catch((err) => {
			if (err.name === "CastError") {
				return res.status(400).json({ errorMessage: "error while updating the todo item (bad request)", error: err });
			}
			return res.status(500).json({ errorMessage: "Internal server error" });
		});
}

function deleteTask(req, res) {
	const id = req.params.id;

	Todo.deleteOne({ _id: id })
		.then((deleteInfo) => {
			if (deleteInfo.deletedCount === 0) {
				return res.status(404).json({ error: "task not found" });
			}
			return res.status(200).json({
				message: "Successful deletion",
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({ errorMessage: "error while deleting item from dataBase" });
		});
}

function allTodoList(req, res) {
	Todo.find()
		.then((doc) => {
			if (doc.length > 0) {
				return res.status(200).json(doc);
			}
			return res.status(404).json({ error: "No Task created yet" });
		})
		.catch((error) => {
			return res.status(500).json({ errorMessage: "Internal Server Error" });
		});
}

function getPriorityList(req, res) {
	const priority = req.params.priority;

	Todo.find({ priority: priority })
		.then((doc) => {
			if (doc.length > 0) {
				return res.status(200).json(doc);
			}
			return res.status(404).json({ errorMessage: `no task with priority ${priority}` });
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({ errorMessage: "Internal Server Error" });
		});
}

export { getPriorityList, addNewTask, allTodoList, deleteTask, updateStatus };
