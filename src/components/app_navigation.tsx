"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Salad,
  BotMessageSquare,
  ChartNoAxesCombined,
  CircleUserRound,
} from "lucide-react";

export default function AppNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex">

        {/* Mobile Bottom Navigation */}
          <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around items-center py-3 md:hidden">
            <a href="#" className="flex flex-col items-center text-sm">
              <LayoutDashboard size={20} />
              <span>Home</span>
            </a>

            <a href="#" className="flex flex-col items-center text-sm">
              <Salad size={20} />
              <span>Meals</span>
            </a>

            <a href="#" className="flex flex-col items-center text-sm">
              <BotMessageSquare size={20} />
              <span>AI</span>
            </a>

            <a href="#" className="flex flex-col items-center text-sm">
              <ChartNoAxesCombined size={20} />
              <span>Progress</span>
            </a>

            <a href="#" className="flex flex-col items-center text-sm">
              <CircleUserRound size={20} />
              <span>Profile</span>
            </a>
          </div>
        {/* Sidebar */}
        <div
          className={`hidden md:flex bg-gray-800 text-white 
                    fixed h-screen transition-all 
                    duration-300 z-10 
                    ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
        >
          {/* Sidebar content */}
          <div className="flex flex-col items-center">
            <div className="mt-4">
              <a
                href="#"
                className="text-white 
                          hover:text-gray-300"
              >
                <LayoutDashboard className="inline-block mr-2" />
                Dashboard
              </a>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-white 
                          hover:text-gray-300"
              >
                <Salad className="inline-block mr-2" />
                Meals
              </a>
            </div>
            {/* Add more sidebar items here */}
            <div className="mt-4">
              <a
                href="#"
                className="text-white 
                          hover:text-gray-300"
              >
                <BotMessageSquare className="inline-block mr-2" />
                AI Coarch
              </a>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-white 
                          hover:text-gray-300"
              >
                <ChartNoAxesCombined className="inline-block mr-2" />
                Progress
              </a>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-white 
                          hover:text-gray-300"
              >
                <CircleUserRound className="inline-block mr-2" />
                Profile
              </a>
            </div>
          </div>
          
        </div>
        {/* Main content */}
        <div
          className={`flex-1 p-4 
                        ${isOpen ? "ml-64" : "ml-0"}`}
        >
          {/* Button to toggle sidebar */}
          <div className="ml-auto">
            <button
              className="hidden md:flex bg-blue-500 hover:bg-blue-700 
                       text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Toggle icon based on isOpen state */}
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
