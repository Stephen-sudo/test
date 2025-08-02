import { Inngest } from "inngest";
import connectdb from "../mongodb/mongoose";
import User from "../model/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "test-next" });

// Inngest Function to save user data to a database

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-creation",
  },
  {
    event: "user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email } = event.data;
    const userData = {
      id: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
    };
    await connectdb();
    await User.create(userData);
  }
);

// Inngest Function to update user data in a database
export const syncUserUpdatation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email } = event.data;
    const userData = {
      id: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
    };
    await connectdb();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest Function to delete user data from a database
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectdb();
    await User.findByIdAndDelete(id);
  }
);
