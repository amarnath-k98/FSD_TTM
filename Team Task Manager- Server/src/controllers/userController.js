import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

export const createUser = async (req, res) => {
  // Admin filled data
  const { name, email, password, role } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      status: "error",
      message: "User already exists",
    });
  }
  const newUser = await User.create({
    name,
    email,
    password: password || "password123",
    role,
  });

sendEmail({
  to: email,
  subject: "Welcome Mail from TTM",
  text: `Hello ${name},
    Welcome to Team Task Manager, here is your account details
    Email : ${email}
    Password : ${password || "Password123"},
    Role : ${newUser.role}
    `,
});

  res.status(201).json({
    status: "success",
    message: "User created successfully",
  });
};

export const getAllUsers = async (req, res) => {
    const users = await User.find().select("-email");
  res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    users,
  });
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await User.findById(id);
  user.role = role;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "User role updated successfully",
    user,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
    user,
  });
};
