import { useEffect } from "react";

import "./App.css";
import { useAppContext } from "./contexts/AppContext";
import Paginate from "./components/Paginate";

const apiUrl = "https://vast-shore-74260.herokuapp.com/banks?city=";

export default function App() {
  const { setFullList, city } = useAppContext();

  useEffect(() => {
    async function getBanks() {
      try {
        const res = await fetch(apiUrl + city);
        setFullList(await res.json());
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
    getBanks();
  }, [city, setFullList]);

  return (
    <main>
      <h1 className="heading">Bank branches</h1>
      <Paginate />
    </main>
  );
}
