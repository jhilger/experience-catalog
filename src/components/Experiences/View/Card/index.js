import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { getIcon } from "../../../Icons";
import Modal from "../../../Modal";
import SingleRequest from "../../../Requests/Create/Single";
import "./card.scss";

const Card = ({ sort, experience, expanded = false }) => {
  const [cardSize, setCardSize] = useState(expanded);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleCard = e => {
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
                : "/img/default.jpg"
            })`
          }}
        />
        <div className="grid-x grid-margin-x grid-margin-y exp-card-main">
          <div className="medium-12 cell exp-card-cat">
            <img
              src={getIcon(
                experience.Experience_Type2__r.Short_Name__c.toLowerCase(),
                "gray"
              )}
              alt={experience.Experience_Type2__r.Alt_Text__c}
            />

            <img
              src={getIcon(
                experience.Pricing_Tier__r.Name.toLowerCase(),
                "gray"
              )}
              alt={experience.Pricing_Tier__r.Name}
            />

            {/* TODO: (Isaac) Show icon that matches tier of experience */}
          </div>

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
              <SingleRequest
                initialValues={{
                  Experience__c: experience.Id,
                  Requirements__c: removeTags(
                    experience.Partnership_Details_Requirements__c
                  ),
                  Pricing_Tier__r: experience.Pricing_Tier__r,
                  Strategic_Partner_Name__c: experience.Strategic_Partner__c,
                  Event_Date__c: experience.Start_Date__c
                    ? experience.Start_Date__c
                    : Date.now()
                }}
                experienceName={experience.Name}
                strategicPartner={experience.Strategic_Partner__r.Name}
                onSuccess={() => setModalOpen(false)}
              />
            </Modal>

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
  experience: PropTypes.object.isRequired,
  expanded: PropTypes.bool
};

export default Card;

/* 

<div
        ref={ref}
        className={
          cardSize
            ? "medium-12 cell exp-card open"
            : "medium-6 large-4 cell exp-card close"
        }
      >


className={
  cardSize
    ? `medium-12 medium-order-${Math.floor(sort / 2)} large-order-${Math.floor(sort / 3)} cell exp-card open`
    : `medium-6 large-4 medium-order-${Math.floor(sort / 2) + 1} large-order-${Math.floor(sort / 3) + 1} cell exp-card close`
  } 

style={
          cardSize
            ? {
                position: "absolute",
                zIndex: 1,
                left: 0,
                top: height,
                background: "#fff"
              }
            : {}
        }




  */

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
