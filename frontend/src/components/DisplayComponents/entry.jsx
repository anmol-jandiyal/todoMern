import { RiEditLine } from "@remixicon/react";
import "./entry.css";

function Entry({ todo, index }) {
	return (
		<>
			<div key={index} data-id={todo._id} className={`todo-entry ${todo.completed ? "task-completed" : ""}`}>
				<div>
					<h3 className="todo-title">{todo.title}</h3>

					<p style={{ color: "red" }}>P: {todo.priority}</p>

					<p>{new Date(todo.date).toLocaleString()}</p>
				</div>

				<div>
					<button className="btn delete-btn">X</button>
					<button className="edit-btn btn" style={{ marginLeft: "10px", padding: "0" }}>
						<RiEditLine style={{ height: "10px" }} className="edit-btn-svg" />
					</button>
				</div>

				<div id="entry-overlay" className="todo-entry-overlay"></div>
			</div>
		</>
	);
}

export default Entry;
