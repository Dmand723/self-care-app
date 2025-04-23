"use client";

import Card from "@/components/card";
import { authContext } from "@/lib/api-handler/auth-contex";
import { userContex } from "@/lib/api-handler/userHandler";
import { useContext, useEffect } from "react";
import { taskContex } from "@/lib/api-handler/tasksHandler";
import "./style.css";

export default function UserHome() {
  const { user } = useContext(authContext);
  const { starCount, addStars, removeStars, addTodo, uData } =
    useContext(userContex);
  const { dailyChallenges } = useContext(taskContex);

  if (!user) {
    return <h1 className="headers">Please Log In</h1>;
  }

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
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    defaultChecked={true}
                    onChange={() => {}}
                  />
                  <i className="check"></i>
                  <span>{todo.title}</span>
                </label>
              ))}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
