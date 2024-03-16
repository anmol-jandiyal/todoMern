import mongoose from "mongoose";

const schema = mongoose.Schema({
	title: { type: String, lowercase: true, required: true },
	completed: { type: Boolean, default: false },
	priority: { type: Number, min: [1, "Priority cannot be less than 1"], max: [6, "Priority cannot be greater than 6"], default: 3 },
	date: { type: Date },
});

const todo = mongoose.model("todo", schema);

export default todo;
