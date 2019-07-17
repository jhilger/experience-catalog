import React, { useContext } from "react";
import Context from "../Context";

const RequestList = () => {
  const [{ requests }] = useContext(Context);
  return (
    <div>
      <h2>Requests</h2>
      {requests.records.map(({ Name, Id }, i) => (
        <div key={Id}>{Name}</div>
      ))}
    </div>
  );
};

export default RequestList;
