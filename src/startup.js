import defaultState from "./components/defaultState";
// eslint-disable-next-line
const {id: contactId, authNeeded} = location.search
  .replace("?", "")
  .split("&")
  .map(v => v.split("="))
  .reduce(
    (p, [key, value]) => ({
      ...p,
      [key]: value
    }),
    {}
  );

window.onunload = () => {
  localStorage.setItem("authNeeded", JSON.stringify(authNeeded || ""));
};

if (
  performance.navigation.type === 1 &&
  JSON.parse(localStorage.getItem("authNeeded") || "") === (authNeeded || "")
) {
  console.info("This page is reloaded");
} else {
  localStorage.removeItem("local_user");
  localStorage.removeItem("oAuth");
}
export const getCallbackUrl = () => `${window.location.origin}/oauth/callback/`;

export const loggedIn = () =>
  (!!getUser().display_name || !!getUser().Name) &&
  localStorage.getItem("oAuth");

export const getUser = () =>
  JSON.parse(localStorage.getItem("local_user")) || defaultState.user;

export const modalRoot = document.getElementById("modal");

export { contactId, authNeeded };
