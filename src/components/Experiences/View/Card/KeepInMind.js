import React from "react";

const KeepInMind = ({ cardSize, experience }) => (
  <div className={cardSize ? "medium-6 cell" : "medium-12 cell"}>
    <div className="exp-card-keepinmind">
      <h4>Keep In Mind</h4>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: experience.Keep_In_Mind__c
        }}
      />
    </div>
  </div>
);

export default KeepInMind;
