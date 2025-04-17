"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";

// Firebase
import { db } from "@/lib/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { Fuzzy_Bubbles } from "next/font/google";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const taskContex = createContext({
  dailyTask: {},
  fetchDailyTask: async () => {},
  truncateString: () => {},
  checkLen: () => {},
});

export default function TaskManager({ children }) {
  const [dailyTask, setDailyTask] = useState({});
  const curDOW = new Date().getDay();
  const fetchDailyTask = async () => {
    const collectionRef = collection(db, "dailyChallanges");
    const q = query(collectionRef, where("DOW", "==", curDOW));
    const docSnap = await getDocs(q);
    const data = docSnap.docs.map((doc) => {
      return {
        id: doc.id,
        dow: daysOfWeek[curDOW],
        ...doc.data(),
      };
    });
    const data1 = data[0];
    setDailyTask(data1);
    console.log("2", dailyTask);
    console.log("3", data[0]);
    return data1;
  };
  function checkLen(str) {
    if (!str || typeof str !== "string") {
      return false;
    }
    if (str.length > 70) {
      return true;
    } else {
      return false;
    }
  }
  function truncateString(str) {
    if (!str || typeof str !== "string") {
      return "";
    }
    if (str.length > 70) {
      return str.slice(0, 70);
    } else {
      return str;
    }
  }
  useEffect(() => {
    fetchDailyTask();

    console.log("1", dailyTask);
  }, [curDOW]);
  const values = {
    dailyTask,
    fetchDailyTask,
    truncateString,
    checkLen,
  };
  return <taskContex.Provider value={values}>{children}</taskContex.Provider>;
}
