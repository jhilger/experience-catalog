import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import CreatePartnerRequestButton from "../../../Requests/Create/SingleRequest/CreatePartnerRequestButton";
import PartnershipDetails from "./PartnershipDetails";
import KeepInMind from "./KeepInMind";
import Title from "./Title";
import Info from "./Info";
import Images from "./Images";
import "./card.scss";

// TODO: (Isaac) Add stamp if there is a specific date for event - "Limited Time Frame" , "Limited Dates" then click on "Request this experience" and if there is a start date, it gets put into form.
// TODO: (Isaac) Can't change the Stategic Partner in the Experience object.

const Card = ({ sort, experience, expanded = false }) => {
  const [cardSize, setCardSize] = useState(expanded);
  const [modalOpen, setModalOpen] = useState(false);
  const toggleCard = () => {
    setCardSize(!cardSize);
  };
  const removeTags = str => (str ? str.replace(/<\/?[^>]+(>|$)/g, "") : "");

  return (
    <CSSTransition
      key={experience.Id}
      in={experience.display}
      timeout={300}
      classNames="cardanim"
      unmountOnExit
    >
      <div
        className={
          cardSize
            ? `medium-12 medium-order-${Math.floor(
                sort / 2
              )} large-order-${Math.floor(sort / 3)} cell exp-card open`
            : `medium-6 large-4 medium-order-${Math.floor(sort / 2) +
                1} large-order-${Math.floor(sort / 3) + 1} cell exp-card close`
        }
      >
        <div
          className={
            experience.Start_Date__c
              ? "exp-card-stamp active"
              : "exp-card-stamp"
          }
        >
          Limited Dates
        </div>
        <button
          type="button"
          onClick={toggleCard}
          className={cardSize ? "exp-card-toggle close" : "exp-card-toggle"}
        >
          <div className="exp-card-plus" />
        </button>
        <Images experience={experience} />
        <div className="grid-x grid-margin-x grid-margin-y exp-card-main">
          <Title cardSize={cardSize} experience={experience} />
          {cardSize && <Info cardSize={cardSize} experience={experience} />}
          {cardSize && (
            <CreatePartnerRequestButton
              initialValues={{
                Experience__c: experience.Id,
                Strategic_Partner_Name__c: experience.Strategic_Partner__c
              }}
            />
          )}
          {cardSize && (
            <KeepInMind cardSize={cardSize} experience={experience} />
          )}
          <PartnershipDetails experience={experience} />
        </div>
      </div>
    </CSSTransition>
  );
};

Card.propTypes = {
  sort: PropTypes.number.isRequired,
  experience: PropTypes.object.isRequired,
  expanded: PropTypes.bool
};

export default Card;
