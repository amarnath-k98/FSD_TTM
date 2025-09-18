import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
   try {
     const { name, email, password } = req.body; // user filled data
     const user = await User.findOne({ email });
     if (user) {
       return res.status(400).json({
         status: "error",
         message: "User Already Exists",
       });
     }
     const newUser = await User.create({ name, email, password });
     const token = generateToken({ id: newUser._id, role: newUser.role });
     res.status(201).json({
       status: "success",
       message: "User Created Successfully",
       token,
     });
   } catch (err) {
     // resultion
   } finally {
     // some clean up steps are mandatory to do
   }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
    const token = await generateToken({ id: user._id, role: user.role });
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      user,
      token,
    });
  
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    user,
  });
};
