import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

const cities = ["DELHI", "MUMBAI", "KOLKATA", "CHENNAI", "BANGALORE"];

export default function AppContextProvider({ children }) {
  const [city, setCity] = useState(cities[0]);
  const [fullList, setFullList] = useState();

  return (
    <AppContext.Provider
      value={{
        cities,
        pageSizeList: [100, 200, 500, 1000, 2000],
        city,
        setCity,
        fullList,
        setFullList
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
