"use client";

import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";

import { useContext, useState } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";
import { recipeContex } from "@/lib/api-handler/recipeHandler";
import { toast } from "react-toastify";

export default function Card() {
  const { user } = useContext(authContext);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6 max-w-sm w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Take a Moment for Yourself
      </h2>
      <p className="text-gray-600 mb-4">
        Remember to breathe, relax, and take care of your mind and body. You
        deserve it!
      </p>
      <button className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition">
        Start a Self-Care Activity
      </button>
    </div>
  );
}
