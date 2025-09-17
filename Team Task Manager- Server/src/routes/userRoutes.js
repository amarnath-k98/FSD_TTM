import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../controllers/userController.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

const userRouter = Router();

userRouter.use(protect, authorizeRole("Admin"));

userRouter.get("/", getAllUsers);
userRouter.put("/:id/role", updateUserRole);
userRouter.delete("/:id", deleteUser);

export default userRouter;
