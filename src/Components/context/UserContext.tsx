import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserContextType>({
  search: "",
  setSearch: () => {},
});
export default UserContext;
