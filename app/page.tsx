"use client";
import Image from "next/image";
import AppNavigation  from "../src/components/app_navigation";
import LoginPage from "./login/page";
import SignupPage from "./signup/page";

export default function Home() {
  return (
    <div >
       <SignupPage />
    </div>
  );
}
