export default function Content({ list }) {
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
      </div>
      {list.map((bank, i) => (
        <div key={i} className="bank-info">
          <p>{bank.bank_id}</p>
          <p>{bank.bank_name}</p>
          <p>{bank.branch}</p>
          <p>{bank.ifsc}</p>
          <p>{bank.address}</p>
          <p>{bank.district}</p>
          <p>{bank.city}</p>
          <p>{bank.state}</p>
        </div>
      ))}
    </>
  );
}
