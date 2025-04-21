"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";
import { recipeContex } from "@/lib/api-handler/recipeHandler";
import Card from "@/components/card";
import AddChallenge from "@/components/adminAddChallenge";
import EditRecipe from "@/components/editRecipe";
import { toast } from "react-toastify";

export default function Admin() {
  const { checkAdmin, user, loading } = useContext(authContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const check = await checkAdmin();

      setIsAdmin(check);
    };
    if (!loading && user) {
      adminCheck();
    }
  }, [loading, user]);
  if (!isAdmin && user) {
    return (
      <div className="bg-black  min-h-screen flex items-center justify-center ">
        {/* <h1 className="text-white font-bold text-9xl">Unauthorized</h1> */}
        <img src="/no.png" className="h-[600px] w-[950px]" alt="LOL" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-start justify-center">
      {!loading && isAdmin ? (
        <div className="flex flex-col gap-10 justify-center items-center">
          <h1 className="headers">Tools</h1>
          <div className="flex gap-7">
            <AddChallenge />
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
