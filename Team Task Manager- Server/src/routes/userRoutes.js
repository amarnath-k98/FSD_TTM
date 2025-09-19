import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../controllers/userController.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

const userRouter = Router();

userRouter.get("/",protect, authorizeRole("Admin", "Manager", "Viewer"), getAllUsers);
userRouter.use(protect, authorizeRole("Admin"));

userRouter.post("/", createUser);

userRouter.put("/:id/role", updateUserRole);
userRouter.delete("/:id", deleteUser);

export default userRouter;
