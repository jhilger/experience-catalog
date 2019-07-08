import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import Context from "../Context";

const Toast = ({ toast }) => {
  let children = null;
  if (toast.message && toast.name) {
    children = (
      <div className={toast.type} style={{ backgroundColor: '#ddd', borderRadius: 5, padding: 10, paddingBottom: 15, margin: 5 }}>
        <h3 style={{marginBlockStart: 8}}>{toast.name}</h3>
        <div>{toast.message}</div>
      </div>
    );
  }
  return children;
};

export default Toast;
