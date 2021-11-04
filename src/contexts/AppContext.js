import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

const cities = ["DELHI", "MUMBAI", "KOLKATA", "CHENNAI", "BANGALORE"];

export default function AppContextProvider({ children }) {
  const [city, setCity] = useState(cities[0]);
  const [fullList, setFullList] = useState();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("favList"))
      setFavList(JSON.parse(localStorage.getItem("favList")));
  }, []);

  function updateFavList(bank, remove = false) {
    let newList;
    if (remove) newList = favList.filter(item => item.ifsc !== bank.ifsc);
    else newList = [...favList, bank];

    setFavList(newList);
    localStorage.setItem("favList", JSON.stringify(newList));
  }

  return (
    <AppContext.Provider
      value={{
        cities,
        pageSizeList: [100, 200, 500, 1000, 2000],
        city,
        setCity,
        fullList,
        setFullList,
        favList,
        updateFavList
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
