import { createContext, useState, useMemo } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
    const [userInfos, setUserInfos] = useState({});
  
    const setUserTokenCookie = (token) => {
      if (token) {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 1440);
        Cookies.set("userToken", token, {
          expires: expirationDate,
        });
        setUserToken(token);
      } else {
        Cookies.remove("userToken");
        setUserToken(null);
      }
    };
  
    const value = useMemo(
      () => ({
        checkBoxFilter,
        setCheckBoxFilter,
        setUserTokenCookie,
        userToken,
        userInfos,
        setUserInfos,
        userJourney,
        setUserJourney,
      }),
      [userToken, userInfos, checkBoxFilter, userJourney]
    );
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }