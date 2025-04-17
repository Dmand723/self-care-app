"use client";

import { useContext } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";

import Link from "next/link";

export default function NavBar() {
  const { user, logout, loading } = useContext(authContext);
  if (!loading) {
    return (
      <div className="navBar">
        <div className="text-center flex-1 flex justify-start ">
          <Link href="/">
            <h1 className="text-pink-300 text-2xl font-bold ">
              Flourish Daily
            </h1>
          </Link>
        </div>
        <div className="flex-1 flex justify-end">
          {!user ? (
            <Link href="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/user"
                className="h-[40px] w-[40px] rounded-full overflow-hidden cursor-pointer"
              >
                <img
                  className="object-cover w-full h-full "
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer"
                />
              </Link>
              <button onClick={logout} className="btn btn-danger">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
