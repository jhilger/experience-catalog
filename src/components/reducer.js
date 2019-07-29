import defaultState from "./defaultState";

const filterItems = (query, experiences) =>
  experiences.map(exp => {
    if (query === "home") {
      exp.display = true;
    } else {
      exp.display = exp.Experience_Type2__r.Short_Name__c === query;
    }
    return exp;
  });

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "CONT/data": {
      const newState = {
        ...state,
        contacts: {
          ...state.contacts,
          data: { ...state.contacts.data, [action.payload.Id]: action.payload }
        }
      };
      return newState;
    }
    case "CONT/Id": {
      const newState = {
        ...state,
        contactId: action.payload.Id
      };
      return newState;
    }
    case "CONT/remove":
      return {
        ...state,
        contactId: null
      };
    case "loggedin":
      return { ...state, user: action.payload, loggedIn: true };
    case "EXP/init": {
      const experiences = action.payload.records;
      return {
        ...state,
        experiences: {
          ...state.experiences,
          records: experiences,
          data: {
            [action.payload.Id]: action.payload
          },
          filtered: filterItems(state.experiences.filter, experiences),
          size: experiences.length,
          total: action.payload.total
        }
      };
    }
    case "REQ/init": {
      const requests = action.payload.records;
      return {
        ...state,
        requests: {
          records: requests,
          size: requests.length,
          total: action.payload.total
        }
      };
    }
    case "EXP/add": {
      const experiences = state.experiences.records.concat(
        action.payload.records
      );
      return {
        ...state,
        experiences: {
          ...state.experiences,
          records: experiences,
          filtered: filterItems(state.experiences.filter, experiences),
          size: experiences.length,
          total: action.payload.total
        }
      };
    }
    case "EXP/filtered":
      return {
        ...state,
        experiences: {
          ...state.experiences,
          filtered: filterItems(
            action.payload.selected,
            state.experiences.records
          ),
          filter: action.payload.selected
        }
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
