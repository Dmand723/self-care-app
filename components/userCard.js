"use client";

import Link from "next/link";

import { useContext, useState } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";
import { recipeContex } from "@/lib/api-handler/recipeHandler";

export default function UserCard({ recipe }) {
  const { user } = useContext(authContext);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" flex flex-col my-5 mx-5 justify-center items-start bg-slate-600 rounded-lg shadow-lg">
        <Link
          href={recipe.link}
          target="_blank"
          className="flex   w-80 h-80 flex-col"
        >
          <div className="p-5 m-auto flex items-center justify-around h-full flex-col text-center">
            <h1 className="text-white text-xl font-bold">{recipe.title}</h1>
            <p>{recipe.desc}</p>
          </div>
          <small className="self-end mx-3 my-1 text-gray-400">
            Click to Veiw Recipe
          </small>
        </Link>
      </div>
    </div>
  );
}
