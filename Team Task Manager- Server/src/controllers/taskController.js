import Task from "../models/Task.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";


export const getAllTasks =async (req, res) => { 
    const requestUserId = req.user.id;
    const requestUserRole = req.user.role;

    // have to add pagination
    let tasks;
    if (requestUserRole === "Admin" || requestUserRole === "Viewer") {
        tasks = await Task.find().populate("assignedTo createdBy");
    } else if (requestUserRole === "Manager") {
        tasks = await Task.find({ createdBy: requestUserId }).populate("assignedTo createdBy");
    } else {
        tasks = await Task.find({assignedTo: requestUserId}).populate("assignedTo createdBy");
    }
    res.status(200).json({
        status: "success",
        message: "Tasks fetched successfully",
        tasks
    })
};


export const createTask = async (req, res) => { 
    const { title, description, dueDate, assignedTo } = req.body;
    const createrId = req.user.id;
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
         res.status(404).json({
            status: "error",
            message: "Assigned user not found"
        });
    }
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      createdBy: createrId,
    });
   sendEmail({
     to: assignedUser.email,
     subject: "New Task Assigned",
     text: `Hello ${assignedUser.name},

        You have been assigned with a new Task: ${title}.

        For Further info, CHECK TTM`,
   });
    res.status(201).json({
        status: "success",
        message: "Task created successfully",
        task: newTask
    })
};


export const updateTask =async (req, res) => { 
    const taskId= req.params.id;
    const { assignedTo, status } = req.body;
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        res.status(404).json({
          status: "error",
          message: "Assigned user not found",
        });
      }  
    }
    
    const task = await Task.findById(taskId);
    if (req.user.role == "Admin") {
        Object.assign(task, req.body);
    } else if (req.user.role == "Manager" && task.createdBy.toString() == req.user.id) {
        Object.assign(task, req.body);
    } else if (req.user.role == "Employee" && task.assignedTo.toString() == req.user.id){
        if (!status)
            return res.status(403).json({
            status: "error",
            message: "Employee can only update status"
        })
        task.status = status;
    } else {
        return res.status(403).json({
          status: "error",
          message: "Unauthorized",
        });
    }

    await task.save();
    res.status(200).json({
        status: "success",
        message: "Task updated successfully",
        task
    });
};


export const deleteTask = async (req, res) => { 
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    res.status(200).json({
        status: "success",
        message: "Task deleted successfully",
        task
    })
};