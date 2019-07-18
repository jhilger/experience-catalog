import React from "react";
import { getIcon } from "../../../Icons";

const Images = ({ experience }) => (
  <div
    className="exp-card-hero"
    style={{
      backgroundImage: `url(${
        experience.Image_URL__c
          ? experience.Image_URL__c
          : "/img/davisestates3.jpg"
      })`
    }}
  >
    <img
      src={getIcon(experience.Experience_Type2__r)}
      data-type={experience.Experience_Type2__r.Short_Name__c}
      alt="Experience type icon"
    />
  </div>
);

export default Images;
