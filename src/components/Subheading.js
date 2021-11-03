import { useAppContext } from "../contexts/AppContext";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";

export default function Subheading({
  setPageSize,
  pagesList,
  setCurList,
  setPagesList,
  setPageNo
}) {
  const { cities, setCity, pageSizeList, setFullList, fullList } =
    useAppContext();

  function handleCityChange(newCity) {
    setCurList(null);
    setFullList(null);
    setPagesList(null);
    setPageSize(pageSizeList[0]);
    setCity(newCity);
  }

  return (
    <div className="subheading">
      <Dropdown options={cities} onChange={handleCityChange} />
      {pagesList && (
        <>
          <SearchBar
            curList={fullList}
            setCurList={setCurList}
            setPageNo={setPageNo}
          />
          <div className="page-no">
            <p>Page:</p>
            <Dropdown options={pagesList} onChange={pgNo => setPageNo(pgNo)} />
          </div>
          <div className="page-no">
            <p>Page size:</p>
            <Dropdown
              options={pageSizeList}
              onChange={size => {
                setPageSize(size);
                setPageNo(1);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
