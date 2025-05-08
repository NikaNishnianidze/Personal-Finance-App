import { createContext, useContext, useState, type ReactNode } from "react";
import type { IInputs } from "../Inputs";

interface IContext {
  newUser: IInputs;
  setNewUser: React.Dispatch<React.SetStateAction<IInputs>>;
}

const userContext = createContext<IContext>({
  newUser: {
    name: "",
    email: "",
    password: "",
  },
  setNewUser: () => {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser
    ? JSON.parse(storedUser)
    : {
        name: "",
        email: "",
        password: "",
      };
  const [newUser, setNewUser] = useState<IInputs>(initialUser);
  return (
    <>
      <userContext.Provider
        value={{
          newUser,
          setNewUser,
        }}
      >
        {children}
      </userContext.Provider>
    </>
  );
}

export const useUser = () => {
  const context = useContext(userContext);
  return context;
};
