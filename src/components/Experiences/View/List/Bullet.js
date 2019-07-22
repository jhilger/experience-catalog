import React, { useContext } from "react";
import Context from "../../../Context";

const ExperienceList = () => {
  const [{ experiences }] = useContext(Context);
  return (
    <div>
<<<<<<< HEAD:src/components/Experiences/List.js
      <h2>Approved Requests</h2>
      {experiences.map(({ Name, Id }, i) => (
=======
      <h2>Experiences</h2>
      {experiences.records.map(({ Name, Id }, i) => (
>>>>>>> 88cab87ed3cf1a7b98a8562c2458601d1afb71f9:src/components/Experiences/View/List/Bullet.js
        <div key={Id}>{Name}</div>
      ))}
    </div>
  );
};

export default ExperienceList;
