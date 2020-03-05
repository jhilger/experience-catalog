import React, { useContext } from "react";
import Context from "../../../Context";
import Card from "../Card";

const VisualExperienceList = () => {
  const [{ experiences }] = useContext(Context);
  return (
    <div className="grid-x grid-margin-x grid-margin-y exp-cards">
      {experiences.filtered.map((exp, i) => (
        <Card key={exp.Id} sort={i} experience={exp} />
      ))}
    </div>
  );
};

export default VisualExperienceList;
