// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// interface User {
//   email: string;
//   password: string;
//   status: boolean;
//   accessToken: string;
//   refreshToken: string;
// }
// export const useAuth = () => {
//   const [isAuthenicated, setIsAuthenicated] = useState(false);
//   const [user, setUser] = useState<Record<string, User>>({});

//   useEffect(() => {
//     const storeUser = Cookies.get("userData");
//     const accessToken = Cookies.get("accessToken");
//     const refreshToken = Cookies.get("refreshToken");
//     if (storeUser) {
//       try {
//         const parsedUser = JSON.parse(storeUser) as Record<string, User>;
//         setUser(parsedUser);
//         // setIsAuthenicated(
//         //   Object.values(parsedUser).some((user) => user.accessToken)
//         // );

//         if (accessToken) {
//           setIsAuthenicated(true);
//         } else {
//           console.log("eror");
//         }
//       } catch (error) {
//         console.error("Error parsing stored user data:", error);
//       }
//     }
//   }, []);

//   const login = (userData: User) => {
//     // setUser(userData);
//     // setIsAuthenicated(true);
//     setUser((prevUser) => {
//       const newUser = { ...prevUser, [userData.email]: userData };
//       Cookies.set("userData", JSON.stringify(newUser), {
//         expires: 1,
//         secure: true,
//       });
//       return newUser;
//     });

//     setIsAuthenicated(true);

//     Cookies.set("accessToken", userData.accessToken, {
//       expires: 1,
//       secure: true,
//     });
//     Cookies.set("refreshToken", userData.refreshToken, {
//       expires: 7,
//       secure: true,
//     });

//     console.log(userData);
//   };

//   const logout = (userEmail: string) => {
//     // setUser(null);
//     // setIsAuthenicated(false);
//     setUser((prvUser) => {
//       const newUser = { ...prvUser };
//       delete newUser[userEmail];
//       return newUser;
//     });

//     setIsAuthenicated(false);
//   };

//   return { isAuthenicated, setIsAuthenicated, user, login, logout };
// };

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenicated: boolean;
  setIsAuthenicated: (value: boolean) => void;
  user: string;
  userId: string | null;
  setUser: (user: string) => void;
  logout: () => void;
  login: (token: string, userId: string, user: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenicated, setIsAuthenicated] = useState<boolean>(() => {
    return !!Cookies.get("token");
  });

  const [user, setUser] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(
    Cookies.get("userId") || null
  );

  // const [user, setUser] = useState(() => {
  //   const userCookie = Cookies.get("user");
  //   return userCookie ? JSON.parse(userCookie) : null; // Convert JSON string back into an object
  // });

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    if (token && userId) {
      fetchUserProfile(token, userId);
    }
  }, []);
  const fetchUserProfile = async (userId: string, token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/secret/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      setUser(data.user);
      setIsAuthenicated(true);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      setIsAuthenicated(false);
      setUser(null);
    }
  };

  const login = (token: string, userId: string, user: string) => {
    Cookies.set("token", token, { expires: 1, secure: true });
    Cookies.set("userId", userId, { expires: 1, secure: true });

    setIsAuthenicated(true);
    setUserId(userId);
    setUser(user);
  };
  const logout = () => {
    Cookies.remove("token");
    setIsAuthenicated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenicated,
        setIsAuthenicated,
        user,
        setUser,
        logout,
        userId,
        login,
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
