"use effect";
import { logout } from "@/actions/logout";
import React, { useTransition } from "react";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
};

function LogOutButton({ children }: Props) {
  const onClick = () => {
    logout();
  };
  return <Button onClick={onClick}>{children}</Button>;
}

export default LogOutButton;
