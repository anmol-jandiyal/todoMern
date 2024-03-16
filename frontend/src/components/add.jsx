import "./add.css";
import axios from "axios";

const ROOT = import.meta.env.VITE_ROOT;

function Add(props) {
	const { todoList, setTodoList } = props;

	const additionHandler = (e) => {
		e.preventDefault();

		const fd = new FormData(e.target);
		const title = fd.get("title");
		const priority = +fd.get("priority");
		const date = new Date();

		axios
			.post(ROOT + "add", { title, priority, date })
			.then((res) => {
				//updating the list also
				setTodoList([...todoList, res.data.entry]);
				alert(res.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<form action="" onSubmit={additionHandler} id="search-form">
				<input type="text" name="title" id="title" placeholder="Enter Title of the Task" required />

				<label htmlFor="priority">Priority</label>
				<select name="priority" id="priority" required>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
				</select>
				<button>+</button>
			</form>
		</>
	);
}

export default Add;
