import { useState, useEffect } from "react";

import "./App.css";
import Dropdown from "./components/Dropdown";
import SearchBar from "./components/SearchBar";
import Content from "./components/Content";

const apiUrl = "https://vast-shore-74260.herokuapp.com/banks?city=";
const cities = ["DELHI", "MUMBAI", "KOLKATA", "CHENNAI", "BANGALORE"];
let fullList;

export default function App() {
  const [banks, setBanks] = useState([]);
  const [city, setCity] = useState(cities[0]);

  useEffect(() => {
    async function getBanks() {
      try {
        const res = await fetch(apiUrl + city);
        const data = (await res.json()).slice(0, 10);
        fullList = data;
        setBanks(data);
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
    getBanks();
  }, [city]);

  function handleCityChange(newCity) {
    fullList = null;
    setCity(newCity);
  }

  return (
    <main>
      <h1 className="heading">Bank branches</h1>
      <div className="subheading">
        <Dropdown options={cities} onChange={handleCityChange} />
        <SearchBar banks={fullList} setBanks={setBanks} />
      </div>
      <div className="content">
        {fullList ? <Content banks={banks} /> : "Loading...."}
      </div>
    </main>
  );
}
