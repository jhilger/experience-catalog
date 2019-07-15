import React, { useState } from "react";
import { getIcon } from "../Icons";
import "./card.scss";

const Card = props => {
  const [cardSize, setCardSize] = useState(false);

  const toggleCard = () => {
    setCardSize(!cardSize);
  };

  return (
    <div
      className={
        cardSize
          ? `medium-12 medium-order-${Math.floor(
              props.sort / 2
            )} large-order-${Math.floor(props.sort / 3)} cell exp-card open`
          : `medium-6 large-4 medium-order-${Math.floor(props.sort / 2) +
              1} large-order-${Math.floor(props.sort / 3) +
              1} cell exp-card close`
      }
    >
      <button
        type="button"
        onClick={toggleCard}
        className={cardSize ? "exp-card-toggle close" : "exp-card-toggle"}
      >
        <div className="exp-card-plus" />
      </button>
      <div
        className="exp-card-hero"
        style={{
          backgroundImage: `url(${props.experience.Image_URL__c})`
        }}
      >
        <img
          src={getIcon(props.experience.Experience_Type__c)}
          alt="Experience type icon"
        />
      </div>
      <div className="grid-x grid-margin-x grid-margin-y exp-card-main">
        <div className={cardSize ? "medium-6 cell" : "medium-12 cell"}>
          <div className="exp-card-title">
            <h2>{props.experience.Strategic_Partner__r.Account__r.Name}</h2>
            <h3>{props.experience.Name}</h3>
          </div>
          <div
            className="exp-card-content"
            dangerouslySetInnerHTML={{ __html: props.experience.content }}
          />
        </div>
        <div className={cardSize ? "medium-6 cell" : "medium-12 cell"}>
          <div className="exp-card-keepinmind">
            <h4>Keep In Mind</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: props.experience.Keep_In_Mind__c
              }}
            />
          </div>
          <div className="exp-card-partnerdetails">
            <h5>Partnership Details / Requirements:</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: props.experience.partnerdetails
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
