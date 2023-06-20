import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { getIcon } from "../Icons";
import "./card.scss";

const Card = ({ sort, experience }) => {
  const [cardSize, setCardSize] = useState(false);
  const toggleCard = () => {
    setCardSize(!cardSize);
  };
  return (
    <CSSTransition
      key={experience.Id}
      in={experience.display}
      timeout={500}
      classNames="cardanim"
      unmountOnExit
    >
      <div
        className={
          cardSize
            ? "medium-12 cell exp-card open"
            : "medium-6 large-4 cell exp-card close"
        }
      >
        <button
          type="button"
          onClick={toggleCard}
          className={cardSize ? "exp-card-toggle close" : "exp-card-toggle"}
        >
          <div className="exp-plus" />
        </button>
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
            src={getIcon(experience.Experience_Type2__r.Short_Name__c, "gray")}
            alt={experience.Experience_Type2__r.Short_Name__c}
          />
        </div>
        <div className="grid-x grid-margin-x grid-margin-y exp-card-main">
          <div className={cardSize ? "medium-6 cell" : "medium-12 cell"}>
            <div className="exp-card-title">
              <h2>{experience.Strategic_Partner__r.Name}</h2>
              <h3>{experience.Name}</h3>
            </div>
            <button type="button" className="fancy">
              Request This Experience
            </button>
            <div
              className="exp-card-content"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: experience.Info__c }}
            />
          </div>
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
            <div className="exp-card-partnerdetails">
              <h5>Partnership Details / Requirements:</h5>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: experience.Partnership_Details_Requirements__c
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

Card.propTypes = {
  sort: PropTypes.number.isRequired,
  experience: PropTypes.object.isRequired
};

export default Card;
