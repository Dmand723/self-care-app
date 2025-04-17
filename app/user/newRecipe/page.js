"use client";

import { useState, useRef, useContext } from "react";
import { authContext } from "@/lib/api-handler/auth-contex";
import { recipeContex } from "@/lib/api-handler/recipeHandler";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function AddRecipe() {
  const [isOn, setIsOn] = useState(false);
  const { user } = useContext(authContext);
  const { addUserRecipe } = useContext(recipeContex);
  const titleRef = useRef();
  const descRef = useRef();
  const linkRef = useRef();

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  const handleSubmit = () => {
    const data = {
      createdBy: user.displayName,
      desc: descRef.current.value,
      isPrivate: isOn,
      link: linkRef.current.value,
      title: titleRef.current.value,
      uid: user.uid,
    };
    addUserRecipe(data);
    toast.success(`Recipe ${data.title} added successfully`);
    redirect("/user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h1 className="headers mb-6">Add New Recipe</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="inputs"
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            ref={titleRef}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="desc"
          >
            Description
          </label>
          <textarea
            className="inputs h-32 resize-none"
            id="desc"
            name="desc"
            placeholder="Description"
            maxLength={317}
            ref={descRef}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="link"
          >
            Link
          </label>
          <input
            className="inputs"
            type="text"
            id="link"
            name="link"
            placeholder="Link"
            ref={linkRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Private
          </label>
          <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              checked={isOn}
              onChange={handleToggle}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <span className="text-gray-700 text-sm font-bold">
            {isOn ? "Yes" : "No"}
          </span>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
