import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
  email: string;
  password: string;
  status: boolean;
  accessToken: string;
}
export const useAuth = () => {
  const [isAuthenicated, setIsAuthenicated] = useState(false);
  const [user, setUser] = useState<Record<string, User>>({});

  useEffect(() => {
    const storeUser = Cookies.get("userData");
    if (storeUser) {
      try {
        const parsedUser = JSON.parse(storeUser) as Record<string, User>;
        setUser(parsedUser);
        setIsAuthenicated(
          !!Object.values(parsedUser).some((user) => user.accessToken)
        );
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  const login = (userData: User) => {
    // setUser(userData);
    // setIsAuthenicated(true);
    setUser((prvUser) => ({
      ...prvUser,
      [userData.email]: userData,
    }));

    setIsAuthenicated(true);

    Cookies.set("userData", JSON.stringify(user), {
      expires: 1,
      secure: true,
    });
  };

  const logout = (userEmail: string) => {
    // setUser(null);
    // setIsAuthenicated(false);
    setUser((prvUser) => {
      const newUser = { ...prvUser };
      delete newUser[userEmail];
      return newUser;
    });

    setIsAuthenicated(false);
  };

  return { isAuthenicated, user, login, logout };
};
