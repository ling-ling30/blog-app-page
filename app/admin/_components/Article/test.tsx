"use client";
import React from "react";

type Props = {};

export default function Test({}: Props) {
  const [res, setRes] = React.useState<any>([]);
  React.useEffect(() => {
    console.log("test");
    const fetchRoot = async () => {
      const res = await fetch(`http://localhost:8787/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        next: { revalidate: 10 },
      });
      console.log(res);
      const res2 = await res.json();
      console.log(res2);
      setRes(res2);
    };
    fetchRoot();
  }, []);
  return <div>{res}</div>;
}
