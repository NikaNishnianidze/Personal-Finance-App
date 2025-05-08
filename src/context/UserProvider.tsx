import { createContext, useContext, useState, type ReactNode } from "react";
import type { IInputs } from "../Inputs";

interface IContext {
  newUser: {};
  setNewUser: React.Dispatch<React.SetStateAction<IInputs>>;
}

const userContext = createContext<IContext>({
  newUser: {},
  setNewUser: () => {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [newUser, setNewUser] = useState<IInputs>({
    name: "",
    email: "",
    password: "",
  });
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
