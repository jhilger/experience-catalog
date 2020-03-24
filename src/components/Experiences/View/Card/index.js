import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getIcon } from "../../../Icons";
import { useImage } from "../../../Image";
import Modal from "../../../Modal";
import SingleRequest from "../../../Requests/Create/Single";
import "./card.scss";

const Div = styled.div`
  transition: all 1s, order 0.25s;
  @media (min-width: 40em) {
    transition: all 1s, order 0.25s;
    order: ${props =>
      !props.cardExpanded
        ? props.orderSize
        : props.orderSize - 1 - ((props.orderSize - 1) % 2)};
  }
  @media (min-width: 64em) {
    transition: all 1s, order 0.125s;
    order: ${props =>
      !props.cardExpanded
        ? props.orderSize
        : props.orderSize - 1 - ((props.orderSize - 1) % 3)};
  }
`;

const Card = ({ sort, experience, expanded: passedExpanded = false }) => {
  const [expanded, setExpanded] = useState(passedExpanded);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleCard = e => {
    setExpanded(!expanded);
  };

  const removeTags = str => (str ? str.replace(/<\/?[^>]+(>|$)/g, "") : "");
  const src = useImage({
    src: `${process.env.PUBLIC_URL}${experience.Image_URL__c}`,
    defaultSrc: `${process.env.PUBLIC_URL}/img/default.jpg`,
    order: ["src", "defaultSrc"]
  });
  return (
    <CSSTransition
      key={experience.Id}
      in={experience.display}
      timeout={500}
      classNames="cardanim"
      unmountOnExit
    >
      <Div
        orderSize={sort + 1}
        cardExpanded={expanded}
        className={
          expanded
            ? "medium-12 cell exp-card open"
            : "medium-6 large-4 cell exp-card close"
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
          className={expanded ? "exp-card-toggle close" : "exp-card-toggle"}
        >
          <div className="exp-plus" />
        </button>
        <div
          className="exp-card-hero"
          style={{
            backgroundImage: `url(${src})`
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
            {experience.Pricing_Tier__r && (
              <img
                src={getIcon(
                  experience.Pricing_Tier__r.Name.toLowerCase(),
                  "gray"
                )}
                alt={experience.Pricing_Tier__r.Name}
              />
            )}
            {/* TODO: (Isaac) Show icon that matches tier of experience */}
          </div>

          <div className={expanded ? "medium-6 cell" : "medium-12 cell"}>
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
                  // Pricing_Tier__c: experience.Pricing_Tier__r
                  //   ? experience.Pricing_Tier__r.Id
                  //   : null,
                  Strategic_Partner_Name__c: experience.Strategic_Partner__c,
                  Event_Date__c: experience.Start_Date__c
                    ? experience.Start_Date__c
                    : Date.now()
                }}
                pricingTier={experience.Pricing_Tier__r}
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

          <div className={expanded ? "medium-6 cell" : "medium-12 cell"}>
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
      </Div>
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
          expanded
            ? "medium-12 cell exp-card open"
            : "medium-6 large-4 cell exp-card close"
        }
      >


className={
  expanded
    ? `medium-12 medium-order-${Math.floor(sort / 2)} large-order-${Math.floor(sort / 3)} cell exp-card open`
    : `medium-6 large-4 medium-order-${Math.floor(sort / 2) + 1} large-order-${Math.floor(sort / 3) + 1} cell exp-card close`
  } 

style={
          expanded
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

 {expanded && (
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
