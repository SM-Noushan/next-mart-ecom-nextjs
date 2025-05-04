"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const { user } = useUser();
  console.log({ user });
  return (
    <div>
      <Button>Test Button</Button>
    </div>
  );
};

export default HomePage;
