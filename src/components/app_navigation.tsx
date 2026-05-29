"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Salad,
  BotMessageSquare,
  ChartNoAxesCombined,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";
import { Home, Carrot, User } from "lucide-react";


interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}


function NavItem({
  icon,
  label,
  active = false,
}: NavItemProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${
        active ? "text-green-600" : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}


export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white py-3">
      <div className="flex justify-around">
        <NavItem
          icon={<Home size={24} />}
          label="Home"
          active
        />

        <NavItem
          icon={<Carrot size={24} />}
          label="Fridge"
        />

        <NavItem
          icon={<User size={24} />}
          label="Profile"
        />
      </div>
    </nav>
  );
}