export default function SearchBar({ banks, setBanks }) {
  function searchBanks(value) {
    value = value.toUpperCase();
    let newList = banks.filter(bank => {
      for (let item in bank) {
        if (`${bank[item]}`.includes(value)) return true;
      }
      return false;
    });
    setBanks(newList);
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
