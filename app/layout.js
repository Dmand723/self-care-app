import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthContextProvider from "@/lib/api-handler/auth-contex";
import RecipeContexProvider from "@/lib/api-handler/recipeHandler";
import QouteHandlerProvider from "@/lib/api-handler/quoteHandler";
import UserProviderHandler from "@/lib/api-handler/userHandler";
import TaskManager from "@/lib/api-handler/tasksHandler";
import NavBar from "@/components/navBar";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Self Care App",
  description: "Self Care App Made By Dawson Simmons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <UserProviderHandler>
            <TaskManager>
              <QouteHandlerProvider>
                <ToastContainer />
                <NavBar />
                {children}
              </QouteHandlerProvider>
            </TaskManager>
          </UserProviderHandler>
        </AuthContextProvider>
      </body>
    </html>
  );
}
