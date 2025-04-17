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

export const recipeContex = createContext({
  publicRecipes: [],
  savedRecipes: [],
  userRecipes: [],
  addPublicRecipe: async () => {},
  addUserRecipe: async () => {},
  editPublicRecipe: async () => {},
  editUserRecipe: async () => {},
  addFavRecipe: async () => {},
  removeFavRecipe: async () => {},
  deleteRecipe: async () => {},
});

export default function RecipeContexProvider({ children }) {
  const [publicRecipes, setPublicRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const { user } = useContext(authContext);

  const addPublicRecipe = async (data) => {
    const collectionRef = collection(db, "publicRecipes");
    try {
      const docSnap = await addDoc(collectionRef, data);

      setPublicRecipes((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            uid: user.uid,
            ...data,
          },
        ];
      });
    } catch (error) {
      throw error;
    }
  };
  const addUserRecipe = async (data) => {
    const collectionRef = collection(db, "userRecipes");
    try {
      const docSnap = await addDoc(collectionRef, data);
      if (!data.isPrivate) {
        const { isPrivate, ...newData } = data;
        const k = {
          refId: docSnap.id,
          ...newData,
        };
        addPublicRecipe(k);
      }

      setUserRecipes((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            uid: user.uid,
            ...data,
          },
        ];
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const editPublicRecipe = async (data) => {
    const collectionRef = doc(db, "publicRecipes", data.id);
    try {
      await updateDoc(collectionRef, { ...data });
      setPublicRecipes((prevState) => {
        const updatedRecipes = [...prevState];

        const foundIndex = updatedRecipes.findIndex((recipe) => {
          return recipe.id === data.id;
        });

        updatedRecipes[foundIndex] = { id: data.id, ...data };

        return updatedRecipes;
      });
    } catch (error) {
      throw error;
    }
  };
  const editUserRecipe = async (data) => {
    const collectionRef = doc(db, "userRecipes", data.id);
    try {
      await updateDoc(collectionRef, { ...data });
      setUserRecipes((prevState) => {
        const updatedRecipes = [...prevState];

        const foundIndex = updatedRecipes.findIndex((recipe) => {
          return recipe.id === data.id;
        });

        updatedRecipes[foundIndex] = { id: data.id, ...data };

        return updatedRecipes;
      });
      if (!data.isPrivate) {
        if (publicRecipes.filter((r) => r.id == data.id).length > 0) {
          const { isPrivate, ...newData } = data;
          editPublicRecipe(newData);
        } else {
          const { isPrivate, ...newData } = data;
          addPublicRecipe(newData);
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const addFavRecipe = async (userId, recipe) => {
    const docRef = doc(db, "users", userId);
    const sorted = savedRecipes.filter((r) => r.id !== recipe.id);
    try {
      const data = {
        favs: [...sorted, recipe],
      };
      await updateDoc(docRef, data);
      setSavedRecipes([...data.favs]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const removeFavRecipe = async (toRemove, userId) => {
    const docRef = doc(db, "users", userId);
    const sorted = savedRecipes.filter((r) => r.id !== toRemove.id);
    try {
      const data = {
        favs: [...sorted],
      };
      await updateDoc(docRef, data);
      setSavedRecipes([...data.favs]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteRecipe = async (toDelete) => {
    const docRef = doc(db, "userRecipes", toDelete.id);
    try {
      await deleteDoc(docRef);
      if (!toDelete.isPrivate) {
        const k = publicRecipes.filter((r) => r.refId == toDelete.id);
        console.log(k);
        // const pDocRef = doc(db, "publicRecipes", k);
        // await deleteDoc(pDocRef);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPublicRecipes = async () => {
      const collectionRef = collection(db, "publicRecipes");
      const docSnap = await getDocs(collectionRef);
      const data = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPublicRecipes(data);
    };
    const getUserRecipes = async () => {
      const collectionRef = collection(db, "userRecipes");
      const q = query(collectionRef, where("uid", "==", user.uid));

      const docSnap = await getDocs(q);
      const data = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUserRecipes(data);
    };
    const getSavedRecipes = async () => {
      const docRef = doc(db, "users", user.uid);
      const favs = (await getDoc(docRef)).data().favs;
      setSavedRecipes(favs);
    };

    if (user) {
      getSavedRecipes();
      getUserRecipes();
    }
    getPublicRecipes();
  }, [user]);
  const values = {
    publicRecipes,
    userRecipes,
    savedRecipes,
    addPublicRecipe,
    addUserRecipe,
    editPublicRecipe,
    editUserRecipe,
    addFavRecipe,
    removeFavRecipe,
    deleteRecipe,
  };
  return (
    <recipeContex.Provider value={values}>{children}</recipeContex.Provider>
  );
}
