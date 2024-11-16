"use client";
import React from "react";

type Props = {};

export default function Test({}: Props) {
  const [res, setRes] = React.useState<any>([]);
  React.useEffect(() => {
    const fetchRoot = async () => {
      const res = await fetch(`http://localhost:8787/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        next: { revalidate: 10 },
      });
      const res2 = await res.json();
      setRes(res2);
    };
    fetchRoot();
  }, []);
  return <div>{res}</div>;
}
