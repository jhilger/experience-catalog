import React, { useContext } from "react";
import Context from "../../../Context";

const ExperienceList = () => {
  const [{ experiences }] = useContext(Context);
  return (
    <div>
      <h2>Experiences</h2>
      {experiences.records.map(({ Name, Id }, i) => (
        <div key={Id}>{Name}</div>
      ))}
    </div>
  );
};

export default ExperienceList;
