import { Link } from "react-router-dom";

import { useAppContext } from "../contexts/AppContext";

export default function Content({ list }) {
  const { favList, updateFavList } = useAppContext();

  return (
    <>
      <div className="results">{list.length} result(s)</div>
      <div className="column-names">
        <p>Bank ID</p>
        <p>Name</p>
        <p>Branch</p>
        <p>Bank IFSC</p>
        <p>Address</p>
        <p>District</p>
        <p>City</p>
        <p>State</p>
        <p>Fav</p>
      </div>
      {list.map((bank, i) => (
        <div key={i} className="bank-info">
          <Link to={"/banks/" + bank.bank_id}>{bank.bank_id}</Link>
          <p>{bank.bank_name}</p>
          <p>{bank.branch}</p>
          <p>{bank.ifsc}</p>
          <p>{bank.address}</p>
          <p>{bank.district}</p>
          <p>{bank.city}</p>
          <p>{bank.state}</p>
          {favList.findIndex(item => item.ifsc === bank.ifsc) > -1 ? (
            <i
              className="fas fa-heart"
              onClick={() => updateFavList(bank, true)}
            />
          ) : (
            <i className="far fa-heart" onClick={() => updateFavList(bank)} />
          )}
        </div>
      ))}
    </>
  );
}
