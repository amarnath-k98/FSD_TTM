import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/taskController.js";
import authorizeRole from "../middlewares/roleMiddleware.js";


const taskRouter = Router();


taskRouter.get("/", protect, getAllTasks);
taskRouter.post("/", protect, authorizeRole("Admin", "Manager"), createTask);
taskRouter.put("/:id", protect, authorizeRole("Admin", "Manager", "Employee"), updateTask);
taskRouter.delete("/:id", protect, authorizeRole("Admin"), deleteTask);

export default taskRouter;