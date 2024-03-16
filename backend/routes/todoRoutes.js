import express from "express";
import { addNewTask, updateStatus, deleteTask, allTodoList, getPriorityList } from "../components/todoFunctionality.js";

const todoRoute = express.Router();

//<-------------addition----------->
todoRoute.post("/add", addNewTask);

//<-------------status updation----------->
todoRoute.patch("/:id", updateStatus);

//<-------------deletion----------->
todoRoute.delete("/:id", deleteTask);

//<-------------to read data from database----------->
todoRoute.get("/", allTodoList);
todoRoute.get("/:priority", getPriorityList);

export default todoRoute;
