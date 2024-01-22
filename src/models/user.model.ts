import mongoose from "mongoose";

interface User {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  "created-at": { type: Date, default: Date.now },
});

const User = mongoose.model<User>("users", userSchema);

export default User;
