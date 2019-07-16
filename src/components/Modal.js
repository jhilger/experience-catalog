import React, { useContext } from "react";
import Context from "./Context";
import "../scss/modal.scss";

const Modal = props => {
  const [context] = useContext(Context);

  const buildModal = type => {
    switch (type) {
      case "requests":
        return (
          <section>
            <h4>Your Requests</h4>
            <ul>
              {context.tempReqData.map(item => (
                <li key={item.id}>
                  <a href={item.url}>{item.name}</a>
                </li>
              ))}
            </ul>
          </section>
        );
      case "experiences":
        return (
          <section>
            <h4>Your Experiences</h4>
            <ul>
              {context.tempExpData.map(item => (
                <li key={item.id}>
                  <a href={item.url}>{item.name}</a>
                </li>
              ))}
            </ul>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={props.active ? "overlay active" : "overlay"}>
      <div className="content">
        <button
          className="exp-plus close"
          onClick={() => props.activateModal(false)}
        />
        {buildModal(props.modal)}
      </div>
    </div>
  );
};

export default Modal;
