import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { getIcon } from "../../../Icons";
import Title from "./Title";
import Info from "./Info";
import CreatePartnerRequestButton from "../../../Requests/Create/SingleRequest/CreatePartnerRequestButton";
import KeepInMind from "./KeepInMind";
import PartnershipDetails from "./PartnershipDetails";

import "./card.scss";

// TODO: (Isaac) Add stamp if there is a specific date for event - "Limited Time Frame" , "Limited Dates" then click on "Request this experience" and if there is a start date, it gets put into form.
// TODO: (Isaac) Can't change the Stategic Partner in the Experience object.

const Card = ({ sort, experience, expanded = false }) => {
  const [cardSize, setCardSize] = useState(expanded);
  // const [modalOpen, setModalOpen] = useState(false);
  const toggleCard = () => {
    setCardSize(!cardSize);
  };
  const removeTags = str => (str ? str.replace(/<\/?[^>]+(>|$)/g, "") : "");

  return (
    <CSSTransition
      key={experience.Id}
      in={experience.display}
      timeout={500}
      classNames="cardanim"
      unmountOnExit
    >
      <div
        /* className={
          cardSize
            ? `medium-12 medium-order-${Math.floor(
                sort / 2
              )} large-order-${Math.floor(sort / 3)} cell exp-card open`
            : `medium-6 large-4 medium-order-${Math.floor(sort / 2) +
                1} large-order-${Math.floor(sort / 3) + 1} cell exp-card close`
        } */
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
            src={getIcon(experience.Experience_Type2__r)}
            data-type={experience.Experience_Type2__r.Short_Name__c}
            alt="Experience type icon"
          />
        </div>
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

/*

 {cardSize && (
  <div>
    <button
      type="button"
      onClick={() => setModalOpen(true)}
      className="info"
    >
      Create Request
    </button>
    <Modal
      active={modalOpen}
      activate={bool => {
        setModalOpen(typeof bool === "boolean" ? bool : !modalOpen);
      }}
    >
      <SingleRequest
        initialValues={{
          Experience__c: experience.Id,
          Strategic_Partner_Name__c: experience.Strategic_Partner__c
        }}
      />
    </Modal>
  </div>
)}

*/
