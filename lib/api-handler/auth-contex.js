"use client";

import { createContext, use, useEffect } from "react";
import { auth } from "@/lib/firebase/firebase";
import {
  EmailAuthCredential,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { redirect } from "next/navigation";
export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  logout: async () => {},
  checkAdmin: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider(auth);

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  };
  const createUser = async (userData) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("uid", "==", userData.uid));
    const docSnap = await getDocs(q);
    if (docSnap.empty) {
      try {
        //const doc = await addDoc(collectionRef, userData);
        await setDoc(doc(db, "users", userData.uid), userData);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const logout = () => {
    signOut(auth);
    redirect("/");
  };
  const checkAdmin = async () => {
    if (!user) {
      return false;
    }
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("uid", "==", user.uid));

    const docsSnap = await getDocs(q);

    const data = docsSnap.docs[0].data();

    return data.roll == "admin";
  };
  useEffect(() => {
    if (user) {
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        roll: "user",
        starAmount: 0,
        dailyReset: new Date(),
        weeklyReset: new Date(),
      };
      createUser(userData);
    }
  }, [user]);
  return (
    <authContext.Provider
      value={{ user, loading, googleLoginHandler, logout, checkAdmin }}
    >
      {children}
    </authContext.Provider>
  );
}
