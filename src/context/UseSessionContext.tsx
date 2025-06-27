// import { createContext, ReactNode, useContext, useState } from "react";


// export type User = {
//     email: string;
//     image: string;
// }

// type UserContextType = {
//     user: User;
//     setUser: React.Dispatch<React.SetStateAction<User>>;
// };

// const emptyUser: User = {
//     email: "",
//     image: "https://img.freepik.com/premium-vector/dark-fantasy-portrait-witch-illustration_961307-7342.jpg",
// }

// const UserContext = createContext<UserContextType>({
//     user: emptyUser,
//     setUser: () => { },
// })

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//     const [user, setUser] = useState<User>(emptyUser);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = (): UserContextType => {
//     const context = useContext(UserContext);
//     return context;
// };