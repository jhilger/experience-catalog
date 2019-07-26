import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { getIcon } from "../../../Icons";
import Modal from "../../../Modal";
import SingleRequest from "../../../Requests/Create/Single";
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
      timeout={500}
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
          <div className={cardSize ? "medium-6 cell" : "medium-12 cell"}>
            <div className="exp-card-title">
              <h2>{experience.Strategic_Partner__r.Name}</h2>
              <h3>{experience.Name}</h3>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="exp-card-request fancy"
            >
              Request This Experience
            </button>

            <Modal
              activate={bool => {
                setModalOpen(typeof bool === "boolean" ? bool : !modalOpen);
              }}
              active={modalOpen}
            >
              {/* TODO: (Isaac) Might need a short description in the Experience object to pass to the request or the request description is ancilliary info for the request input by the salesperson */}
              <SingleRequest
                initialValues={{
                  Experience__c: experience.Id,
                  Requirements__c: removeTags(
                    experience.Partnership_Details_Requirements__c
                  ),
                  Strategic_Partner_Name__c: experience.Strategic_Partner__c,
                  ExperienceName: experience.Name,
                  StrategicPartnerName: experience.Strategic_Partner__r.Name,
                  Event_Date__c: experience.Start_Date__c
                    ? experience.Start_Date__c
                    : ""
                }}
              />
            </Modal>

            <div
              className="exp-card-content"
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
