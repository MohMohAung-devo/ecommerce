import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenicated: boolean;
  setIsAuthenicated: (value: boolean) => void;
  user: string;
  userId: string | null;
  setUser: (user: string) => void;
  logout: () => void;
  _id: string;
  // login: (token: string, userId: string, user: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenicated, setIsAuthenicated] = useState<boolean>(() => {
    return !!Cookies.get("token");
  });

  const [user, setUser] = useState<string | null>(Cookies.get("user") || null);

  const [userId, setUserId] = useState<string | null>(
    Cookies.get("userId") || null
  );
  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");
    if (token && user) {
      setUser(user);
      setIsAuthenicated(true);
    } else {
      setIsAuthenicated(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenicated,
        setIsAuthenicated,
        user,
        setUser,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
