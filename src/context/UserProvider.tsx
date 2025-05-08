import { createContext, useContext, useState, type ReactNode } from "react";
import type { IInputs } from "../Inputs";
import data from "../data.json";
import type { TFinance } from "../data";

interface IContext {
  newUser: IInputs;
  setNewUser: React.Dispatch<React.SetStateAction<IInputs>>;
  finance: TFinance;
  setFinance: React.Dispatch<React.SetStateAction<TFinance>>;
}

const userContext = createContext<IContext>({
  newUser: {
    name: "",
    email: "",
    password: "",
  },
  setNewUser: () => {},
  finance: data,
  setFinance: () => {},
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
  const [finance, setFinance] = useState<TFinance>(data);
  return (
    <>
      <userContext.Provider
        value={{
          newUser,
          setNewUser,
          finance,
          setFinance,
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
