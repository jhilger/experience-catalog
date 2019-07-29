import React from "react";

const Title = ({ cardSize, experience }) => (
  <div className={cardSize ? "medium-6 cell" : "medium-12 cell"}>
    <div className="exp-card-title">
      <h2>{experience.Strategic_Partner__r.Account__r.Name}</h2>
      <h3>{experience.Name}</h3>
    </div>
  </div>
);

export default Title;
