"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "@/model/UserModel";

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const emptyUser: User = {
  id: 0,
  email: "",
  pseudo: "",
  avatar:
    "https://img.freepik.com/premium-vector/dark-fantasy-portrait-witch-illustration_961307-7342.jpg",
  progress: {
    id: 0,
    history_id: 0,
    step_id: 0,
    object_id: null,
    user_id: 0,
    inventory_id: [0],
  },
  inventory: [
    {
      id: 0,
      is_used: false,
      user_id: 0,
      object_id: 0,
      history_id: 0,
      name: "",
      description: "",
      image: "",
    },
  ],
};

const UserContext = createContext<UserContextType>({
  user: emptyUser,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(emptyUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  return context;
};
