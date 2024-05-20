import Chat from "@models/Chat";
import User from "@models/User";
import { connectToDB } from "@mongodb"

export const GET = async(req, {params}) => {

    try {
        await connectToDB();
        const { userId } = params;

        const allChats = await Chat.find({members: userId})
        .sort({lastMessageAt: -1})
        .populate({
            path: "members",
            model: User
        })
        return new Response(JSON.stringify(allChats), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response("Failed to get all Chats", {status: 500})
    }
}