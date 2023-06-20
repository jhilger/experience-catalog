import React from "react";
import { getIcon } from "../../../Icons";
import { useImage } from "../../../Image";

const Images = ({ experience }) => {
  const src = useImage({
    src: experience.Image_URL__c,
    defaultSrc: "/img/davisestates3.jpg"
  });
  return (
    <div
      className="exp-card-hero"
      style={{
        backgroundImage: `url(${src})`
      }}
    >
      <img
        src={getIcon(experience.Experience_Type2__r)}
        data-type={experience.Experience_Type2__r.Short_Name__c}
        alt="Experience type icon"
      />
    </div>
  );
};

export default Images;
