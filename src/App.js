import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { useAppContext } from "./contexts/AppContext";
import Paginate from "./components/Paginate";
import BankPage from "./components/BankPage";

const apiUrl = "https://vast-shore-74260.herokuapp.com/banks?city=";

export default function App() {
  const { setFullList, city } = useAppContext();

  useEffect(() => {
    async function getBanks() {
      try {
        // check if cached value is present
        if (localStorage.getItem(city)) {
          setFullList(JSON.parse(localStorage.getItem(city)));
        } else {
          const res = await fetch(apiUrl + city);
          const itemList = await res.json();
          setFullList(itemList);
          // cache the value
          localStorage.setItem(city, JSON.stringify(itemList));
        }
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
    getBanks();
  }, [city, setFullList]);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/banks/:bankId" element={<BankPage />} />
          <Route
            path="/"
            element={
              <>
                <h1 className="heading">Bank branches</h1>
                <Paginate />
              </>
            }
          />
          <Route path="*" element="404 not found" />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
