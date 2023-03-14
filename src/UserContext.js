import React, {useState, useContext} from "react";


const userContext = React.createContext();

export function useUserContext(){
    return useContext(userContext);
}


export function UserProvider(props){
      const [userData, setUserData] = useState(null);
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      

      const value = {
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
      }

      return (<userContext.Provider value={value}>{props.children}</userContext.Provider>);
}