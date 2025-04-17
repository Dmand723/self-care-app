"use client";

import React, { useContext } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";

import { FcGoogle as GoogleIcon } from "react-icons/fc";

export default function SignIn() {
  const { googleLoginHandler } = useContext(authContext);

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <div className="flex flex-col overflow-hidden shadow-md shadow-pink-200 bg-pink-300 rounded-2xl h-[500px] justify-center items-center">
        <div className="px-4 py-4">
          <h3 className="text-2xl text-center font-bold text-white">
            Please Sign In To Continue
          </h3>

          <button
            onClick={googleLoginHandler}
            className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-pink-700 rounded-lg"
          >
            <GoogleIcon className="text-2xl" />
            Google
          </button>
        </div>
      </div>
    </main>
  );
}
