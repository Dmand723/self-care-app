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
  addTodo: async (title) => {},
});
export default function UserProviderHandler({ children }) {
  const [starCount, SetStarCount] = useState(0);
  const [uData, setUdata] = useState({});
  const { user } = useContext(authContext);

  function calculateDays(startDate) {
    let start = new Date(startDate);
    let end = new Date();
    let timeDifference = end - start;
    let daysDifference = timeDifference / (1000 * 3600 * 24);

    return Math.floor(daysDifference);
  }

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
    checkDates();
    setUdata(data[0]);
    SetStarCount(Number(data[0].starAmount));
  };

  function checkDates() {
    if (calculateDays(uData.dailyReset) >= 1) {
      epmtyFinishedTasks("daily");
    }
    if (calculateDays(uData.weeklyReset) >= 7) {
      epmtyFinishedTasks("weekly");
    }
  }

  function setDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // add one bc for some reason it thinks its one month less????????
    const day = date.getDate();
    const newDate = `${year}-${month}-${day}`;
    return newDate;
  }

  const epmtyFinishedTasks = async (category) => {
    const usersData = uData;

    const toEmpty = category + "finished";
    const toReset = category + "Reset";

    const docRef = doc(db, "users", usersData.id);
    await updateDoc(docRef, { [toEmpty]: [] });
    await updateDoc(docRef, { [toReset]: setDate() });
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
  const addTodo = async (title) => {
    const userData = uData;

    const docRef = doc(db, "users", userData.id);
    const existingTodo = userData.todo || [];
    const updatedTodo = [...existingTodo, { title: title, compleated: false }];
    await updateDoc(docRef, { todo: updatedTodo });
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
        addTodo,
      }}
    >
      {children}
    </userContex.Provider>
  );
}
