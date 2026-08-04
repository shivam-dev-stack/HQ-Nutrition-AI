// src/context/UserContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "@/src/lib/api";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    if (!token) {
      setLoading(false);
      return;
    }

    const { data, error } = await apiRequest("/api/me/");
    if (!error) {
      setUser(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);