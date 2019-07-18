import React, { useContext } from "react";
import Context from "../Context";


const RequestList = () => {
  const [{ tempReqData }] = useContext(Context);
  return (
    <React.Fragment>
      <h2>Pending Requests</h2>
      <ul>
        {tempReqData.map(({ id, experience, url, status, contact, date }) => (
        (status === 'pending') ? 
          <li>
            <a targer="_blank" href={url} key={id}>
              <h5>{contact}</h5>              
              {experience}<span class="divider">|</span>{date}
            </a>
          </li> 
          : null
      ))}
      </ul>
    </React.Fragment>
  );
};

/*const RequestList = () => {
  const [{ requests }] = useContext(Context);
  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.map(({ Name, Id }, i) => (
        <div key={Id}>{Name}</div>
      ))}
    </div>
  );
};*/

export default RequestList;
