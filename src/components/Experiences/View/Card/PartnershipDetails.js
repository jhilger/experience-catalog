import React from "react";

const PartnershipDetails = ({ experience }) => (
  <div className="exp-card-partnerdetails">
    <h5>Partnership Details / Requirements:</h5>
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: experience.Partnership_Details_Requirements__c
      }}
    />
  </div>
);

export default PartnershipDetails;
