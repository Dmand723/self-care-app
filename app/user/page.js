"use client";

import Card from "@/components/card";
import { authContext } from "@/lib/api-handler/auth-contex";
import { userContex } from "@/lib/api-handler/userHandler";
import { useContext, useEffect } from "react";

export default function UserHome() {
  const { user } = useContext(authContext);
  const { starCount, addStars, removeStars } = useContext(userContex);

  if (!user) {
    return <h1 className="headers">Please Log In</h1>;
  }

  return (
    <div>
      <div className="flex items-center bg-yellow-200 rounded-full px-4 py-2 shadow-md w-fit mt-3 ml-3">
        <img src="/star-icon.png" alt="Star Icon" className="w-6 h-6 mr-2 " />
        <span className="text-lg font-bold text-gray-800">{starCount}</span>
      </div>
      <Card />
    </div>
  );
}
