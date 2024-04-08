import { useState } from "react";

interface User {
  email: string;
  password: string;
  status: boolean;
}
export const useAuth = () => {
  const [isAuthenicated, setIsAuthenicated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenicated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenicated(false);
  };

  return { isAuthenicated, user, login, logout };
};
