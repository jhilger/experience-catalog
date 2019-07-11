import defaultState from "./defaultState";

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "loggedin":
      return { ...state, user: action.payload, loggedIn: true };
    case "EXP/init":
      return {
        ...state,
        experiences: action.payload,
        filtered: action.payload
      };
    case "EXP/add":
      return {
        ...state,
        experiences: state.experiences.concat(action.payload)
      };
    case "EXP/filtered":
      return {
        ...state,
        filtered: action.payload.array,
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
