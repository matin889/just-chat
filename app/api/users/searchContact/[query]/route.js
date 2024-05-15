import User from "@models/User";
import { connectToDB } from "@mongodb";

export const GET = async (req, { params }) => {
  try {
    // Connect to the database
    connectToDB();

    // Extract the query parameter from the request
    const { query } = params;

    // Search for contacts based on the query term
    const searchedContacts = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    // Return the searched contacts in the response
    return new Response(JSON.stringify(searchedContacts), { status: 200 });
  } catch (error) {
    // Handle errors and return an appropriate error response
    console.error("Failed to search contact:", error);
    return new Response("Failed to search contact", { status: 500 });
  }
};
