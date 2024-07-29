const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware
const mongoose = require("mongoose"); // Import Mongoose for MongoDB
const todoModel = require('./models/todo'); // Import the Mongoose model for todos

const app = express(); // Create an Express application

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies in requests

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// Route to get all todos
app.get('/get', (req, res) => {
    todoModel.find() // Retrieve all todos from the database
        .then(result => res.json(result)) // Send the result as JSON
        .catch(err => res.json(err)); // Send error as JSON
});

// Route to update a specific todo
app.patch('/update/:id', (req, res) => {
    const { id } = req.params; // Extract todo ID from URL parameters
    const { checked } = req.body; // Extract checked status from request body
    todoModel.findByIdAndUpdate(id, { checked: checked }, { new: true }) // Update the todo in the database
        .then(result => res.json(result)) // Send the updated todo as JSON
        .catch(err => res.json(err)); // Send error as JSON
});

// Route to delete a specific todo
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params; // Extract todo ID from URL parameters
    todoModel.findByIdAndDelete(id) // Delete the todo from the database
        .then(result => res.json(result)) // Send the deleted todo as JSON
        .catch(err => res.json(err)); // Send error as JSON
});

// Route to add a new todo
app.post('/add', (req, res) => {
    const task = req.body.task; // Extract task description from request body
    todoModel.create({ task: task }) // Create a new todo in the database
        .then(result => res.json(result)) // Send the created todo as JSON
        .catch(err => res.json(err)); // Send error as JSON
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
