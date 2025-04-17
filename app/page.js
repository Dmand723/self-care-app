"use client";

import { useContext, useState } from "react";
import { quoteContext } from "@/lib/api-handler/quoteHandler";
import { taskContex } from "@/lib/api-handler/tasksHandler";

export default function Home() {
  const { quote } = useContext(quoteContext);
  const { dailyTask, checkLen, truncateString } = useContext(taskContex);
  const [popupOpen, setPopupOpen] = useState(false);

  const popupHandler = () => {
    if (popupOpen) {
      setPopupOpen(false);
    } else {
      setPopupOpen(true);
    }
  };
  return (
    <div>
      {popupOpen && (
        <div className="grayOutBg">
          <div className="taskEnlarged">
            <button
              onClick={popupHandler}
              className="closeButton absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &#10005;
            </button>
            <h2 className="taskEnlarged-title">{dailyTask.title}</h2>
            <p className="taskEnlarged-description">{dailyTask.challenge}</p>
            <small className="text-gray-500">
              Compleating this challenge will earn you 10 stars
            </small>
          </div>
        </div>
      )}
      <img src="/scenic.jpeg" alt="photo" className="homeImg" />
      <div className="mainPage-body-container">
        <div className="quoteBlock relative inline-block">
          <div className="vertical-line"></div>
          <div className="quote">
            <h1>Daily quote:</h1>
            <p className="pl-4">"{quote.content}"</p>
            <small className="quoteAuthor inline pl-4">-{quote.author}</small>
          </div>
        </div>
        <img
          src="/scenic2.jpeg"
          alt="photo"
          className="seccondairyPhotos"
          id="test"
        />
        <img src="/scenic3.jpeg" alt="photo" className="seccondairyPhotos" />
        <div className="quoteBlock relative inline-block">
          <div className="vertical-line"></div>
          <div className="quote">
            <h1>{dailyTask.title}:</h1>
            <p className="pl-4">
              "
              {checkLen(dailyTask.challenge) ? (
                <>
                  {truncateString(dailyTask.challenge)}
                  <button
                    onClick={popupHandler}
                    className="text-blue-500 no-underline inline"
                  >
                    <small>...Veiw More</small>
                  </button>
                </>
              ) : (
                dailyTask.challenge
              )}
              "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
