import React, { useContext } from "react";
import Context from "../Context";

const RequestList = () => {
  const [{ requests }] = useContext(Context);
  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.map(({ Name, Id }, i) => (
        <div key={Id}>{Name}</div>
      ))}
    </div>
  );
};

export default RequestList;
