"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import Loader from "./Loader";
import { pusherClient } from "@lib/pusher";

const ChatList = ({ currentChatId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  const getChats = async () => {
    try {
      const res = await fetch(
        search !== ""
          ? `/api/users/${currentUser._id}/searchChat/${search}`
          : `/api/users/${currentUser._id}`
      );
      const data = await res.json();
      console.log("Fetched Chats:", data); // Log fetched chats
      setChats(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getChats();
    }
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser._id);

      const handleChatUpdate = (updatedChat) => {
        console.log("Updated Chat:", updatedChat); // Log updated chat
        setChats((allChats) =>
          allChats.map((chat) => {
            if (chat._id === updatedChat._id) {
              return { ...chat, messages: updatedChat.messages, lastMessageAt: updatedChat.lastMessageAt };
            } else {
              return chat;
            }
          })
        );
      };

      const handleNewChat = (newChat) => {
        console.log("New Chat:", newChat); // Log new chat
        setChats((allChats) => [...allChats, newChat]);
      };

      pusherClient.bind("update-chat", handleChatUpdate);
      pusherClient.bind("new-chat", handleNewChat);

      return () => {
        pusherClient.unsubscribe(currentUser._id);
        pusherClient.unbind("update-chat", handleChatUpdate);
        pusherClient.unbind("new-chat", handleNewChat);
      };
    }
  }, [currentUser]);

  console.log("Chats Data:", chats);

  return loading ? (
    <Loader />
  ) : (
    <div className="chat-list">
      <input
        placeholder="Search chat..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="chats">
        {chats?.map((chat) => (
          <ChatBox
            key={chat._id}
            chat={chat}
            currentUser={currentUser}
            currentChatId={currentChatId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
