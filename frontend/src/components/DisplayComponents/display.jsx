import { useCallback, useState } from "react";
import "./display.css";
import Entry from "./entry";
import Edit from "./edit";
import axios from "axios";

const ROOT = import.meta.env.VITE_ROOT;

function statusHandler(id, todoList, setTodoList, status) {
	//updation in db
	axios
		.patch(ROOT + id, { completed: status })
		.then((res) => {
			alert(res.data.message);

			//updation in todoList
			const index = todoList.findIndex((todo) => todo._id === id);
			todoList.splice(index, 1, res.data.updatedEntry);
			setTodoList([...todoList]);
		})
		.catch((err) => {
			console.log(err);
		});
}

function deleteHandler(id, todoList, setTodoList) {
	const check = confirm("Are you sure to delete the task");
	if (check) {
		axios
			.delete(ROOT + id)
			.then((res) => {
				alert("Task Deleted Successfully");

				setTodoList(todoList.filter((todo) => todo._id !== id));
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

function Display(props) {
	const { todoList, setTodoList } = props;
	const [editToggle, setEditToggle] = useState(false);
	const [todoId, setTodoId] = useState(null);

	if (todoList.length === 0) {
		return (
			<>
				<h1 style={{ textAlign: "center", margin: "30px", color: "orange" }}>NO TASK CREATED</h1>
			</>
		);
	}

	const handleClick = (e) => {
		const todoEntry = e.target.closest(".todo-entry");

		if (todoEntry === null) {
			return;
		}

		const id = todoEntry.dataset.id;

		if (e.target.classList.contains("todo-entry-overlay")) {
			let status = todoEntry.classList.contains("task-completed") ? false : true;
			statusHandler(id, todoList, setTodoList, status);
		} else if (e.target.classList.contains("delete-btn")) {
			deleteHandler(id, todoList, setTodoList);
		} else if (e.target.classList.contains("edit-btn-svg") || e.target.classList.contains("edit-btn")) {
			setEditToggle(true);
			setTodoId(id);
		}
	};

	return (
		<>
			<div id="todo-output" onClick={handleClick}>
				<h1 style={{ color: "orange" }}>Todo list</h1>

				<Edit setEditToggle={setEditToggle} todoList={todoList} setTodoList={setTodoList} editToggle={editToggle} todoId={todoId} />

				{todoList.map((todo, index) => {
					return <Entry todo={todo} key={index} />;
				})}
			</div>
		</>
	);
}

export default Display;
