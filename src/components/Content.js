export default function Content({ banks }) {
  return (
    <>
      <div className="results">{banks.length} result(s)</div>
      <div className="column-names">
        <p>Bank ID</p>
        <p>Bank name</p>
        <p>Bank branch</p>
        <p>Bank IFSC</p>
        <p>City</p>
        <p>State</p>
      </div>
      {banks.map((bank, i) => (
        <div key={i} className="bank-info">
          <p>{bank.bank_id}</p>
          <p>{bank.bank_name}</p>
          <p>{bank.branch}</p>
          <p>{bank.ifsc}</p>
          <p>{bank.city}</p>
          <p>{bank.state}</p>
        </div>
      ))}
    </>
  );
}