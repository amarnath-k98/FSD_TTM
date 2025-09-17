import User from "../models/User.js";



export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        message: "Users fetched successfully",
        users
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
        user
    })
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
        user
    });
    
};