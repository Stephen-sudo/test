import { Inngest } from "inngest";
import connectdb from "../mongodb/mongoose";
import User from "../model/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "test-next" });

// Inngest Function to save user data to a database

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
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
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
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
