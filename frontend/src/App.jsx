import { useState, useEffect } from "react";
import Add from "./components/add";
import axios from "axios";
import Display from "./components/DisplayComponents/display";

const ROOT = import.meta.env.VITE_ROOT;

function App() {
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		axios
			.get(ROOT)
			.then((res) => {
				setTodoList(() => res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div style={{ background: "#0f0e0d", minHeight: "100svh" }}>
				<Add setTodoList={setTodoList} todoList={todoList} />
				<Display todoList={todoList} setTodoList={setTodoList} />
			</div>
		</>
	);
}

export default App;
