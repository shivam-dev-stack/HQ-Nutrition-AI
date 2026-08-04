'use-client';

import React from "react";
import BottomNavigation from "../../src/components/app_navigation";
import { UserProvider } from "@/src/context/UserContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <UserProvider>
      <BottomNavigation />
      <main className="flex-1 p-4">{children}</main>
      </UserProvider>
    </div>
  );
}