const mongoose = require('mongoose'); // Import Mongoose library

// Define a schema for the 'todo' collection
const todoSchema = new mongoose.Schema({
    task: {
        type: String, // 'task' is a string field
        required: true // Ensure that 'task' is provided when creating a todo item
    },
    checked: {
        type: Boolean, // 'checked' is a boolean field
        default: false // Default value for 'checked' is false
    }
});

// Create a Mongoose model based on the schema
const todomodel = mongoose.model("tasks", todoSchema);

// Export the model so it can be used in other files
module.exports = todomodel;
