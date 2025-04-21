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

export const adminContex = createContext({
  addChallenge: async () => {},
});

export default function AdminContexProvider({ children }) {
  const addChallenge = async (data) => {
    const collectionRef = collection(db, "challenges");
    try {
      const docSnap = await addDoc(collectionRef, data);
    } catch (error) {
      throw error;
    }
  };
  const values = {
    addChallenge,
  };
  return <adminContex.Provider value={values}>{children}</adminContex.Provider>;
}
