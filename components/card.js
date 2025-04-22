"use client";

import Link from "next/link";

import { use, useContext, useState } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";
import { recipeContex } from "@/lib/api-handler/recipeHandler";
import { toast } from "react-toastify";
import { userContex } from "@/lib/api-handler/userHandler";

export default function Card({ title, desc, starAmmount, category }) {
  const { user } = useContext(authContext);
  const { addStars, updateCompleatedChallenges, uData } =
    useContext(userContex);
  const finishedCategory = category + "finished";

  const isTitleCompleted =
    Array.isArray(uData[finishedCategory]) &&
    uData[finishedCategory].includes(title);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6 max-w-sm w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{desc}</p>
      {isTitleCompleted ? (
        <div className="isCompletedChallengeBtn">
          <img src="/checkmark-emerald.png" className="w-6 h-6 mr-2" />
        </div>
      ) : (
        <button
          className="completeChallengeBtn"
          onClick={() => {
            addStars(user.uid, Number(starAmmount));
            updateCompleatedChallenges(category, title);
          }}
        >
          <img src="/star-icon.png" className="w-6 h-6 mr-2" />+
          {starAmmount.toString()}
        </button>
      )}
    </div>
  );
}
