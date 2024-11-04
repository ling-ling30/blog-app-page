"use client";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  const handleLogout = async () => {
    signOut();
  };
  return (
    <div>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
