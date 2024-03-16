import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoute from "./routes/todoRoutes.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const server = express();

server.use(cors());

server.use(express.json());
server.use("/todos", todoRoute);

const URL = process.env.URL;

mongoose
	.connect(URL)
	.then(() => {
		console.log("CONNECTION TO DATABASE ESTABLISHED");

		server.listen(PORT, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("SERVER STARTED");
			}
		});
	})
	.catch((err) => {
		console.log(err);
		console.log("PROBLEM WILL CONNECTING TO SERVER");
	});
