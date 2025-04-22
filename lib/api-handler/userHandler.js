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
  uData: {},
  updateCompleatedChallenges: async () => {},
  fetchUserData: async () => {},
  addStars: async () => {},
  removeStars: async () => {},
});
export default function UserProviderHandler({ children }) {
  const [starCount, SetStarCount] = useState(0);
  const [uData, setUdata] = useState({});
  const { user } = useContext(authContext);
  // function getDifferenceInDays(date) {
  //   // Convert both dates to milliseconds
  //   const today = new Date();
  //   const timeDifference = date - today;

  //   // Convert milliseconds to days
  //   const differenceInDays = timeDifference / (1000 * 60 * 60 * 24);

  //   return Math.floor(differenceInDays); // Use Math.floor to get whole days
  // } Fix this to say the accual diffrence in days

  const fetchUserData = async (userId) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("uid", "==", userId));
    const docSnap = await getDocs(q);
    const data = docSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // if (hasDaysPassed(data[0].dailyReset, 1)) {
    //   epmtyFinishedTasks("daily");
    // }
    // if (hasDaysPassed(data[0].weeklyReset, 7)) {
    //   epmtyFinishedTasks("weekly");
    // }
    setUdata(data[0]);
    SetStarCount(Number(data[0].starAmount));
  };

  const epmtyFinishedTasks = async (category) => {
    const usersData = uData;

    const toEmpty = category + "finished";
    const toReset = category + "Reset";

    const docRef = doc(db, "users", usersData.id);
    await updateDoc(docRef, { [toEmpty]: [] });
    await updateDoc(docRef, { [toReset]: new Date() });
  };

  const addStars = async (userId, amount) => {
    const usersData = uData;

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
    const usersData = uData;
    let newStarAmount = usersData.starAmount - amount;

    const data = {
      ...usersData,
      starAmount: newStarAmount,
    };

    const docRef = doc(db, "users", usersData.id);
    await updateDoc(docRef, { starAmount: newStarAmount });
    SetStarCount(newStarAmount);
  };
  const updateCompleatedChallenges = async (category, title) => {
    const usersData = uData;
    const docRef = doc(db, "users", usersData.id);
    const categoryToUpdate = category + "finished";
    // Get the existing array or initialize it as an empty array
    const existingTitles = usersData[categoryToUpdate] || [];

    // Add the new title to the array if it doesn't already exist
    const updatedTitles = [...existingTitles, title].filter(
      (value, index, self) => self.indexOf(value) === index // Ensure no duplicates
    );
    console.log(updatedTitles);
    await updateDoc(docRef, { [categoryToUpdate]: updatedTitles });
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user, fetchUserData, updateCompleatedChallenges, epmtyFinishedTasks]);
  return (
    <userContex.Provider
      value={{
        starCount,
        fetchUserData,
        addStars,
        updateCompleatedChallenges,
        removeStars,
        uData,
      }}
    >
      {children}
    </userContex.Provider>
  );
}
