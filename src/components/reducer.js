import defaultState from "./defaultState";

const filterItems = (query, experiences) =>
  experiences.map(exp => {
    if (query === "home") {
      exp.display = true;
    } else {
      exp.display = exp.Experience_Type2__r.Short_Name__c.toLowerCase() === query;
    }
    return exp;
  });

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "loggedin":
      return { ...state, user: action.payload, loggedIn: true };
    case "EXP/init":
      return {
        ...state,
        experiences: action.payload,
        filtered: filterItems(state.filter, action.payload)
      };
    case "REQ/init":
      return {
        ...state,
        requests: action.payload
      };
    case "EXP/add":
      return {
        ...state,
        experiences: state.experiences.concat(action.payload),
        filtered: filterItems(
          state.filter,
          state.experiences.concat(action.payload)
        )
      };
    case "EXP/filtered":
      return {
        ...state,
        filtered: filterItems(action.payload.selected, state.experiences),
        filter: action.payload.selected
      };
    case "TOAST/error":
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            timeStamp: action.payload.timeStamp,
            name: action.payload.name,
            message: action.payload.message,
            info: action.payload.info,
            type: "error"
          }
        ]
      };
    case "TOAST/success":
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            timeStamp: action.payload.timeStamp,
            timeOut: action.payload.timeOut,
            name: action.payload.name,
            message: action.payload.message,
            info: action.payload.info,
            type: "success"
          }
        ]
      };
    case "ERROR":
      // eslint-disable-next-line no-console
      console.error(action.payload);
      return state;
    case "CLEAR":
      return {
        ...state,
        toasts: state.toasts.filter(v => v.timeOut < action.payload.timeOut)
      };
    default:
      return state;
  }
}

export default reducer;
