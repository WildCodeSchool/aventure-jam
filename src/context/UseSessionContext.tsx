"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "@/model/userModel";



type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const emptyUser: User = {
    id: 0,
    email: "",
    pseudo: "",
    avatar: "https://img.freepik.com/premium-vector/dark-fantasy-portrait-witch-illustration_961307-7342.jpg",
    progress: {
        history_id: 0,
        etape_id: 0,
        inventaire_id: [0]
    },
    inventaire: [
        {
        isUsed: false,
        objectId: 0,
        image: "",
        name: "",
        }
    ]
}

const UserContext = createContext<UserContextType>({
    user: emptyUser,
    setUser: () => { },
})

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