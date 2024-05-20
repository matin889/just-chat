import { useRouter } from "next/navigation";
import React from "react";

const ChatBox = ({ chat, currentUser }) => {
  const otherMembers = chat?.members?.filter(
    (member) => member._id !== currentUser._id
  );

  // Check if otherMembers is defined before accessing its properties
  const profileImage =
    otherMembers && otherMembers.length > 0
      ? otherMembers[0].profileImage
      : "/assets/user.png";
  const chatUserName =
    otherMembers && otherMembers.length > 0 ? otherMembers[0].username : "";
  const lastMessage =
    chat?.messages?.length > 0 && chat?.messages[chat?.messages.length - 1];
  // Convert lastMessageAt to Date object and format the time
  const lastMessageTime = chat.lastMessageAt
    ? new Date(chat.lastMessageAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "";

    const router = useRouter();

  return (
    <div className="chat-box" onClick={()=> router.push(`/chats/${chat._id}`)}>
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
          {!lastMessage && <p>Started Chat</p>}
        </div>
      </div>
      <div>
      {!lastMessage && <p>
          {/* {chat?.isGroup ? (
            <p className="text-base-light">{lastMessageTime || ""}</p>
          ) : (
            <span>{lastMessageTime || ""}</span>
          )} */}
           {lastMessageTime}
        </p>}
      </div>
    </div>
  );
};

export default ChatBox;
