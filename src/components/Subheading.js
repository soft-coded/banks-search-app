import { useAppContext } from "../contexts/AppContext";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";

let isFavList = false;

export default function Subheading({
  setPageSize,
  pagesList,
  setCurList,
  setPagesList,
  setPageNo
}) {
  const { cities, setCity, pageSizeList, setFullList, fullList, favList } =
    useAppContext();

  function handleCityChange(newCity) {
    setCurList(null);
    setFullList(null);
    setPagesList(null);
    setPageSize(pageSizeList[0]);
    setPageNo(1);
    setCity(newCity);
  }

  function handleFavBtnClick() {
    if (isFavList) {
      isFavList = false;
      setCurList(fullList);
      return;
    }
    isFavList = true;
    setPageNo(1);
    setCurList(favList);
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
          <button className="fav-btn" onClick={handleFavBtnClick}>
            {isFavList ? "View all" : "View favourites"}
          </button>
        </>
      )}
    </div>
  );
}
