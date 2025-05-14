import {
  createContext,
  use,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { IInputs } from "../Inputs";
import data from "../data.json";
import type { TFinance } from "../data";

interface IContext {
  newUser: IInputs;
  setNewUser: React.Dispatch<React.SetStateAction<IInputs>>;
  finance: TFinance;
  setFinance: React.Dispatch<React.SetStateAction<TFinance>>;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
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
  active: "/home",
  setActive: () => {},
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
  const [active, setActive] = useState<string>("/home");

  return (
    <>
      <userContext.Provider
        value={{
          newUser,
          setNewUser,
          finance,
          setFinance,
          active,
          setActive,
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
