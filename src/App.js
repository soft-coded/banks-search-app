import { useState, useEffect } from "react";

import "./App.css";
import Dropdown from "./components/Dropdown";
import SearchBar from "./components/SearchBar";
import Content from "./components/Content";

const apiUrl = "https://vast-shore-74260.herokuapp.com/banks?city=";
const cities = ["DELHI", "MUMBAI", "KOLKATA", "CHENNAI", "BANGALORE"];
let fullBanksList,
  pageSizeList = [100, 200, 500, 1000, 2000],
  pageSize = pageSizeList[0],
  pageNum = 1;

function getNewPagesList(newPageSize) {
  pageNum = 1;
  pageSize = newPageSize;
  let newList = [];
  for (let i = 1; i <= Math.ceil(fullBanksList.length / newPageSize); i++)
    newList.push(i);
  return newList;
}

export default function App() {
  const [banks, setBanks] = useState([]);
  const [city, setCity] = useState(cities[0]);
  const [pagesList, setPagesList] = useState([]);

  useEffect(() => {
    async function getBanks() {
      try {
        const res = await fetch(apiUrl + city);
        fullBanksList = await res.json();
        setPagesList(getNewPagesList(pageSize));
        setBanks(fullBanksList.slice(0, pageSize));
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
    getBanks();
  }, [city]);

  function handleCityChange(newCity) {
    fullBanksList = null;
    setCity(newCity);
  }

  function handlePageChange(pageNo) {
    pageNum = pageNo;
    setBanks(fullBanksList.slice(pageSize * (pageNum - 1), pageSize * pageNum));
  }

  function handlePageSizeChange(newSize) {
    setPagesList(getNewPagesList(newSize));
    setBanks(fullBanksList.slice(0, newSize));
  }

  return (
    <main>
      <h1 className="heading">Bank branches</h1>
      <div className="subheading">
        <Dropdown options={cities} onChange={handleCityChange} />
        {fullBanksList && (
          <>
            <SearchBar banks={fullBanksList} setBanks={setBanks} />
            <div className="page-no">
              <p>Page:</p>
              <Dropdown options={pagesList} onChange={handlePageChange} />
            </div>
            <div className="page-no">
              <p>Page size:</p>
              <Dropdown
                options={pageSizeList}
                onChange={handlePageSizeChange}
              />
            </div>
          </>
        )}
      </div>
      <div className="content">
        {fullBanksList ? <Content banks={banks} /> : "Loading...."}
      </div>
    </main>
  );
}
