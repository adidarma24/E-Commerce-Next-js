import { Inngest } from "inngest";
import User from "@/models/user";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "PasarRakyat-next" });

// Inngest functions to save user data to a database
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
      name: first_name + "" + last_name,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(UserData);
  }
);
