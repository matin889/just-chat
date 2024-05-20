import Chat from "@models/Chat";
import { connectToDB } from "@mongodb"
import User from "@models/User"

export const POST = async (req) => {
    try {
        await connectToDB();

        const body = await req.json();

        const { currentUserId, members, isGroup, name, groupPhoto} = body;

        // Define "query" find the Chat
        const query = isGroup
      ? { isGroup, name, groupPhoto, members: [currentUserId, ...members] }
      : { members: { $all: [currentUserId, ...members], $size: 2 } };

        let chat = await Chat.findOne(query);

        if(!chat) {
            chat = await new Chat(
                isGroup ? query : { members: [currentUserId, ...members]}
        );

        await chat.save();

        const updateAllMembers = chat.members.map(async (memberId) => {
            await User.findByIdAndUpdate(
                memberId,
                {
                    $addToSet: {chats: chat._id},
                },
                {new: true}
            );
        })
        Promise.all(updateAllMembers);
        }

        return new Response(JSON.stringify(chat), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new chat", {status: 500})
    }
}