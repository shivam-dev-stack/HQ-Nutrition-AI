import React from "react";
import { Sun } from "lucide-react";
import { PT_Serif } from "next/font/google";
import { Bell } from "lucide-react";
import Logo from "@/src/components/logo";
import DateSelector from "@/src/components/dateSelector";

const ptSerif = PT_Serif({
  weight: "700", // Bold
  subsets: ["latin"],
});

const days = [
  { day: "M", date: 10 },
  { day: "T", date: 11 },
  { day: "W", date: 12 },
  { day: "T", date: 13 },
  { day: "F", date: 14 },
  { day: "S", date: 15 },
  { day: "S", date: 16 },
]

function page() {
  let name = "Shivam";
  let time = "morning";
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-100">
      {/* mobile view */}
      <div className="md:hidden">
        <div>
          <div className="ml-3">
            <span className="flex text-xl font-semibold">
              <Sun className="inline-block mr-2 mt-1" />
              <h5>Good {time} </h5>
            </span>
            <h1 className="className={ptSerif.className} m;-1">{name}</h1>
          </div>
          <Bell className="absolute top-4 right-4" />
        </div>
        <div className="bg-white/20 m-10 backdrop-blur-lg rounded-xl  border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
          <div className="text-white">
            <div className="rounded-lg mb-4">
              <Logo />
            </div>
            <h3 className="text-xl ml-2 font-semibold mb-2"></h3>
            <p className="ml-2 text-white/80 mb-4">
              Using rounded-xl for smooth corners
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm transition-colors">
              Learn More
            </button>
          </div>
        </div>
        {/* <DateSelector days = {days}/> */}
      </div>
    </div>
  );
}

export default page;
