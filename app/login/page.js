"use client";

import SignIn from "@/components/SignIn";
import { useContext } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";

import { redirect } from "next/navigation";

export default function SignInPage() {
  const { user } = useContext(authContext);

  if (!user) {
    return <SignIn />;
  }
  redirect("/");
}
