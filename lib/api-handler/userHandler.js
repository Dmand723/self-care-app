"use client";

import { createContext, use, useContext, useEffect, useState } from "react";
import { authContext } from "./auth-contex";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  updateDoc,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
export const userContex = createContext({
  starCount: 0,
  fetchUserData: async () => {},
  addStars: async () => {},
  removeStars: async () => {},
});
export default function UserProviderHandler({ children }) {
  const [starCount, SetStarCount] = useState(0);
  const { user } = useContext(authContext);

  const fetchUserData = async (userId) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("uid", "==", userId));
    const docSnap = await getDocs(q);
    const data = docSnap.docs.map((doc) => {
      return {
        id: doc.id,
        user: doc.data().displayName,
        starCount: doc.data().starAmount,
      };
    });
    SetStarCount(data[0].starCount);
  };
  const addStars = async (userId, amount) => {
    const collectionRef = collection(db, "users");

    const q = query(collectionRef, where("uid", "==", userId));
    const userData = (await getDocs(q)).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const usersData = userData[0];

    let newStarAmount = usersData.starAmount + amount;

    const data = {
      ...usersData,
      starAmount: newStarAmount,
    };

    const docRef = doc(db, "users", usersData.id);
    await updateDoc(docRef, { starAmount: newStarAmount });
    SetStarCount(newStarAmount);
  };
  const removeStars = async (userId, amount) => {
    const collectionRef = collection(db, "users");

    const q = query(collectionRef, where("uid", "==", userId));
    const userData = (await getDocs(q)).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const usersData = userData[0];

    let newStarAmount = usersData.starAmount - amount;

    const data = {
      ...usersData,
      starAmount: newStarAmount,
    };

    const docRef = doc(db, "users", usersData.id);
    await updateDoc(docRef, { starAmount: newStarAmount });
    SetStarCount(newStarAmount);
  };
  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user, fetchUserData]);
  return (
    <userContex.Provider
      value={{ starCount, fetchUserData, addStars, removeStars }}
    >
      {children}
    </userContex.Provider>
  );
}
