import React from "react";

const Info = ({ cardSize, experience }) => (
  <div className="exp-card-info">
    {/* <p>{experience.Info__c}</p> */}
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: experience.Info__c
      }}
    />
  </div>
);

export default Info;
