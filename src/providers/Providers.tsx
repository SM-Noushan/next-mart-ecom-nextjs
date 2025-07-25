"use client";

import UserProvider from "@/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

export default Providers;
