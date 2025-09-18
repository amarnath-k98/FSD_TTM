import { model, Schema } from "mongoose";


const taskSchema = Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
        minLength: [3, "Title must be at least 3 characters"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Description is required"],
        minLength: [3, "Description must be at least 3 characters"]
    },
    status: {
        type: String,
        enum: ["pending", "in_process", "completed"],
        default: "pending"
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Assigned user is required"]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator user is required"]
    }
    
}, { timestamps: true });




const Task = model("Task", taskSchema);
export default Task;

