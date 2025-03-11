import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
  email: string;
  password: string;
  status: boolean;
  accessToken: string;
  refreshToken: string;
}
export const useAuth = () => {
  const [isAuthenicated, setIsAuthenicated] = useState(false);
  const [user, setUser] = useState<Record<string, User>>({});

  useEffect(() => {
    const storeUser = Cookies.get("userData");
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if (storeUser) {
      try {
        const parsedUser = JSON.parse(storeUser) as Record<string, User>;
        setUser(parsedUser);
        // setIsAuthenicated(
        //   Object.values(parsedUser).some((user) => user.accessToken)
        // );

        if (accessToken) {
          setIsAuthenicated(true);
        } else if (refreshToken) {
          refreshToken(refreshToken);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  const login = (userData: User) => {
    // setUser(userData);
    // setIsAuthenicated(true);
    setUser((prevUser) => {
      const newUser = { ...prevUser, [userData.email]: userData };
      Cookies.set("userData", JSON.stringify(newUser), {
        expires: 1,
        secure: true,
      });
      return newUser;
    });

    setIsAuthenicated(true);

    Cookies.set("accessToken", userData.accessToken, {
      expires: 1,
      secure: true,
    });
    Cookies.set("refreshToken", userData.refreshToken, {
      expires: 7,
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
