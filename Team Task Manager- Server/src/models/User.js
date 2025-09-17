import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minLength: 3
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false
    },
    role: {
        type: String,
        enum: ["Admin", "Manager", "Employee", "Viewer"],
        default: "Viewer"
    }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})


userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}


const User = model("User", userSchema);
export default User;