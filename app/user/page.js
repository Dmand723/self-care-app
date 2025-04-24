"use client";

import Card from "@/components/card";
import { authContext } from "@/lib/api-handler/auth-contex";
import { userContex } from "@/lib/api-handler/userHandler";
import { useContext, useEffect, useState, useRef } from "react";
import { taskContex } from "@/lib/api-handler/tasksHandler";
import "./style.css";
import { IoTrashOutline } from "react-icons/io5";

export default function UserHome() {
  const { user } = useContext(authContext);
  const { starCount, removeTodo, addTodo, uData, setTodoCompleted } =
    useContext(userContex);
  const { dailyChallenges } = useContext(taskContex);

  const newTodoRef = useRef("");

  if (!user) {
    return <h1 className="headers">Please Log In</h1>;
  }
  const handleAdd = () => {
    addTodo(newTodoRef.current.value);
    newTodoRef.current.value = "";
  };
  const handleAddX = () => {
    newTodoRef.current.value = "";
  };

  return (
    <div>
      <div className="relative topImg">
        <img src="/scenic5.jpeg" alt="photo" className="homeImg" />
        <div className="absolute top-3 left-3 flex items-center bg-yellow-200 rounded-full px-4 py-2 shadow-md w-fit">
          <img src="/star-icon.png" alt="Star Icon" className="w-6 h-6 mr-2" />
          <span className="text-lg font-bold text-gray-800">{starCount}</span>
        </div>
      </div>
      <h1 className="headers mt-4">Daily Tasks</h1>
      <div className="topRow flex items-start">
        <div className="challenge-cards flex flex-wrap gap-5">
          {dailyChallenges && dailyChallenges.length > 0 ? (
            dailyChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                title={challenge.title}
                desc={challenge.desc}
                starAmmount={challenge.starCount}
                category={challenge.category}
              />
            ))
          ) : (
            <p>No challenges available</p>
          )}
        </div>
        <form>
          <fieldset className="todo-list">
            <legend className="todo-list__title">Todo List</legend>

            {uData.todo &&
              uData.todo.length > 0 &&
              uData.todo.map((todo) => (
                <label className="todo-list__label" key={todo.title}>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        defaultChecked={todo.completed}
                        onChange={(event) => {
                          setTodoCompleted(todo.title, event.target.checked);
                        }}
                      />
                      <i className="check"></i>
                      <span className="ml-2">{todo.title}</span>
                    </div>
                    {/* Small Red Button */}
                    <button
                      type="button"
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                      onClick={() => removeTodo(todo.title)} // Replace with your delete logic
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </label>
              ))}
            <div className="add-Todo_lable todo-list__label ">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <input
                    className="cursor-default"
                    type="checkbox"
                    name=""
                    id=""
                    disabled
                  />
                  <i className="check cursor-default "></i>
                  <input
                    type="text"
                    className="bg-transparent ml-10 w-[13rem] mr-1"
                    maxLength="17"
                    placeholder="Enter Todo"
                    ref={newTodoRef}
                  ></input>
                </div>
                <div
                  type="button"
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition mr-2"
                  onClick={handleAdd} // Replace with your delete logic
                >
                  &#x2714;
                </div>
                <div
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                  onClick={handleAddX} // Replace with your delete logic
                >
                  &#x2716;
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
