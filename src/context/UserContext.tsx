import React from "react";
import { IUser } from "@/types";
import { getCurrentUser } from "@/app/services/AuthService";

export interface IUserProvider {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = React.createContext<IUserProvider | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  React.useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider");

  return context;
};

export default UserProvider;
