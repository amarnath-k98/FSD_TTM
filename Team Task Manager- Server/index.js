import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/configs/db.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

//debug helper => consoles req type, req url, req time
app.use((req, res, next) => {
  console.log(req.method, req.url, new Date().toLocaleString());
  next();
});

//Routh cofiguration

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);



app.get("/", (req, res) => {
  res.send("<h1>Application is running</h1>");
});

app.get(errorHandler);
const PORT = process.env.Port || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
