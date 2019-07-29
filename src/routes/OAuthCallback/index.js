import React from "react";
// import { DataService } from "forcejs";
// import Context from "../../components/Context";

const OAuthCallback = () => {
  const event = new CustomEvent("oauthCallback", {
    detail: window.location.href
  });
  window.opener.document.dispatchEvent(event);
  window.close();
  return <div />;
};
export default OAuthCallback;
