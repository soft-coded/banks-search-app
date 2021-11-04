import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useAppContext } from "../contexts/AppContext";

export default function BankPage() {
  const [banksList, setBanksList] = useState();
  let { bankId } = useParams();
  const { fullList } = useAppContext();

  useEffect(() => {
    if (fullList) {
      let numBankId = +bankId;
      const itemList = fullList.filter(item => item.bank_id === numBankId);
      setBanksList(itemList);
    }
    return () => setBanksList(null);
  }, [fullList, bankId]);

  return (
    <div>
      <h1>Bank info</h1>
      {banksList ? (
        <div className="bank-details">
          <p>Bank ID: {banksList[0].bank_id}</p>
          <p>Bank name: {banksList[0].bank_name}</p>
          <p>
            Branches:&nbsp;
            {banksList.map((bank, i) => (
              <span key={i}>{bank.branch}, </span>
            ))}
          </p>
          <p>
            IFSC codes:&nbsp;
            {banksList.map((bank, i) => (
              <span key={i}>{bank.ifsc}, </span>
            ))}
          </p>
          <p>City: {banksList[0].city}</p>
          <p>State: {banksList[0].state}</p>
        </div>
      ) : (
        "Loading"
      )}
      <Link to="/" className="home-link">
        Go back
      </Link>
    </div>
  );
}
