import "./edit.css";
import axios from "axios";
const ROOT = import.meta.env.VITE_ROOT;

function Edit({ editToggle, setEditToggle, todoId, todoList, setTodoList }) {
	function editHandler(e) {
		e.preventDefault();

		const newTitle = new FormData(e.target).get("edit-title");

		axios
			.patch(ROOT + todoId, { title: newTitle })
			.then((res) => {
				alert(res.data.message);

				const index = todoList.findIndex((todo) => todo._id === todoId);
				todoList.splice(index, 1, res.data.updatedEntry);
				setTodoList([...todoList]);
			})
			.catch((err) => {
				console.log(err);
			});

		setEditToggle(false);
	}

	const taskObj = todoList.find((todo) => {
		return todo._id === todoId;
	});

	if (taskObj === undefined) {
		return;
	}

	const oldTaskName = taskObj.title;

	return (
		<div className="edit-overlay" style={{ display: editToggle ? "flex" : "none" }}>
			<button
				className="edit-overlay-close"
				onClick={(e) => {
					e.preventDefault();
					setEditToggle(false);
				}}>
				x
			</button>

			<form action="" className="edit-form" onSubmit={editHandler}>
				<input type="text" name="edit-title" defaultValue={oldTaskName} />
				<button>Edit</button>
			</form>
		</div>
	);
}

export default Edit;
