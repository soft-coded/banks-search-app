export default function SearchBar({ curList, setCurList, setPageNo }) {
  function searchBanks(value) {
    setPageNo(1);
    value = value.trim().toUpperCase();
    let newList = curList.filter(bank => {
      for (let item in bank) {
        if (`${bank[item]}`.includes(value)) return true;
      }
      return false;
    });
    setCurList(newList);
  }

  return (
    <div className="search-bar">
      <i className="fas fa-search"></i>
      <input
        type="text"
        placeholder="Search"
        onChange={e => searchBanks(e.target.value)}
      />
    </div>
  );
}
