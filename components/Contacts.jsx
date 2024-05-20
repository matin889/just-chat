"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  const currentUser = session?.user;

  const getContacts = async () => {
    try {
      const url =
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users";
      const res = await fetch(url);
      const data = await res.json();
      setContacts(data.filter((contact) => contact._id !== currentUser?._id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getContacts();
    }
  }, [currentUser, search]);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const isGroup = selectedContacts.length > 1;
  // Select Contact
  const handleSelectedContacts = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((item) => item !== contact)
      );
    } else {
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contact,
      ]);
    }
  };
  // Add Group Chat Name

  const [name, setName] = useState("");
  const router = useRouter();

  //Create Chat
const createChat = async () => {
  try {
    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: currentUser._id,
        members: selectedContacts.map((contact) => contact._id),
        isGroup,
        name,
      }),
    });
    const chat = await res.json();

    if (res.ok) {
      // Use router object to navigate to the new chat page
      router.push(`/chats/${chat._id}`);
    } else {
      console.error("Failed to create chat:", chat);
    }
  } catch (error) {
    console.error("Failed to create chat:", error);
  }
};

  return loading ? (
    <Loader />
  ) : (
    <div className="create-chat-container">
      <input
        placeholder="Search contact..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="contact-bar">
        <div className="contact-list">
          <p className="text-body-bold">Select or Deselect</p>
          {contacts.map((user, index) => (
            <div
              key={index}
              className="contact"
              onClick={() => handleSelectedContacts(user)}
            >
              {selectedContacts.find((item) => item === user) ? (
                <CheckCircle sx={{ color: "green" }} />
              ) : (
                <RadioButtonUnchecked />
              )}
              <img
                src={user.profileImage || "/assets/user.png"}
                alt="profile"
                className="profilePhoto"
              />
              <p className="text-base-bold">{user.username}</p>
            </div>
          ))}
        </div>
        <div className="create-chat">
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Group Chat Name</p>
                <input
                  placeholder="Enter Group Chat Naame"
                  className="input-group-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Members</p>
                <div className="flex fllex-wrap gap-3">
                  {selectedContacts.map((contact, index) => (
                    <p className="selected-contact" key={index}>
                      {contact.username}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
          <button className="btn" onClick={createChat}>FIND OR START A NEW CHAT</button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
