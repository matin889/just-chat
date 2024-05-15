"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="topbar">
      <Link href="/chats">
        <img src="/assets/chat.png" alt="logo" className="logo" style={{width: "40px"}}/>
      </Link>

      <div className="menu">
        <Link
          href="/chats"
          className={`${pathname === "/chats" ? "text-red-1" : ""}`}
          text-heading4-bold
        >
          Chats
        </Link>
        <Link
          href="/contacts"
          className={`${pathname === "/contacts" ? "text-red-1" : ""}`}
          text-heading4-bold
        >
          Contacts
        </Link>

        <Logout
          sx={{ color: "#737373", cursor: "pointer" }}
          onClick={handleLogout}
        />
        <Link href="/profile">
          <img
            src={user?.profileImage || "/assets/user.png"}
            alt="profile"
            className="profilePhoto"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
