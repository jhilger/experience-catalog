import jsforce from "jsforce/build/jsforce";

jsforce.browser.init({
  clientId: window.clientId,
  proxyUrl: "https://node-salesforce-proxy.herokuapp.com/proxy/",
  scope: "full refresh_token",
  redirectUri: `${window.location.origin}/oauth/callback/`
});

export default jsforce;
