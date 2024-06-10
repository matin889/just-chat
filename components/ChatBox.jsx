import { useRouter } from "next/navigation";

const ChatBox = ({ chat, currentUser, currentChatId }) => {
  const otherMembers = chat?.members?.filter(
    (member) => member._id !== currentUser._id
  );

  const profileImage =
    otherMembers && otherMembers.length > 0
      ? otherMembers[0].profileImage
      : "/assets/user.png";
  const chatUserName =
    otherMembers && otherMembers.length > 0 ? otherMembers[0].username : "";

  // Assuming chat.messages contains actual message objects, not just IDs
  const lastMessage =
    chat?.messages && chat?.messages.length > 0
      ? chat.messages[chat.messages.length - 1]
      : null;

  const lastMessageTime = chat.lastMessageAt
    ? new Date(chat.lastMessageAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "";

  const seen = lastMessage?.seenBy?.find(
    (member) => member._id === currentUser._id
  );

  console.log("Chat ID:", chat._id);
  console.log("Chat Members:", chat?.members);
  console.log("Messages:", chat?.messages);
  console.log("Last Message ID:", lastMessage?._id);
  console.log("Last Message Text:", lastMessage?.text);
  console.log("Chat Last Message Time:", lastMessageTime);

  const router = useRouter();

  return (
    <div
      className={`chat-box ${chat._id === currentChatId ? "bg-blue-2" : ""}`}
      onClick={() => router.push(`/chats/${chat._id}`)}
    >
      <div className="chat-info">
        {chat?.isGroup ? (
          <img
            src={chat?.groupPhoto || "/assets/users.png"}
            alt="Group-Photo"
            className="profilePhoto"
          />
        ) : (
          <img
            src={profileImage}
            alt="profile-photo"
            className="profilePhoto"
          />
        )}
        <div className="flex flex-col gap-1">
          {chat?.isGroup ? (
            <p className="text-base-bold"> {chat?.name}</p>
          ) : (
            <p className="text-base-bold"> {chatUserName}</p>
          )}
          {lastMessage ? (
            lastMessage?.photo ? (
              lastMessage?.sender?._id === currentUser._id ? (
                <p className="text-small-medium text-grey-3">You sent a photo</p>
              ) : (
                <p
                  className={`${
                    seen ? "text-small-medium text-grey-3" : "text-small-bold"
                  }`}
                >
                  Received a photo
                </p>
              )
            ) : (
              <p
                className={`last-message ${
                  seen ? "text-small-medium text-grey-3" : "text-small-bold"
                }`}
              >
                {lastMessage?.text}
              </p>
            )
          ) : (
            <p className="text-small-bold">Started Chat</p>
          )}
        </div>
      </div>
      <div>
        <p className="text-base-light text-grey-3">{lastMessageTime}</p>
      </div>
    </div>
  );
};

export default ChatBox;
