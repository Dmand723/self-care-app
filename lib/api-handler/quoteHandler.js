"use client";

import { createContext, useState, useEffect } from "react";

export const quoteContext = createContext({
  quote: "",
  setQuote: () => {},
});

export default function QuoteHandlerProvider({ children }) {
  const [quote, setQuote] = useState("");
  const baseUrl = "https://api.quotable.io";
  const params = {
    maxLength: 74,
  };

  const randomQuote = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/random?maxLength=${params.maxLength}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching quote:", error);
      return "Error fetching quote.";
    }
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const newQuote = await randomQuote();
      setQuote(newQuote);
    };
    fetchQuote();
  }, []);

  return (
    <quoteContext.Provider value={{ quote, setQuote }}>
      {children}
    </quoteContext.Provider>
  );
}
