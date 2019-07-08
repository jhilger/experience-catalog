import jsforce from "jsforce/build/jsforce";

jsforce.browser.init({
  clientId: window.clientId,
  proxyUrl: window.location.origin + "/ajax/proxy/",
  scope: "full refresh_token",
  redirectUri: window.location.origin + "/oauth/callback/"
});

export default jsforce;
