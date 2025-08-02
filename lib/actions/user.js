import User from "../model/User";
import { connectdb } from "../mongodb/mongoose";

export const createOrUpateUser = async (name, email, password) => {
  try {
    await connectdb();

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      // Update user information
      user.name = name;
      user.password = password;
    } else {
      // Create a new user
      user = new User({ name, email, password });
    }

    await user.save();
    return user;
  } catch (error) {
    console.error("Error in createOrUpateUser:", error);
    throw error;
  }
};
