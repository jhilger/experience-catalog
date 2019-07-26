import { useRef, useState } from "react";
import defaultState from "./defaultState";

export const useThunkReducer = (reducerFunction, initialArg, init = a => a) => {
  const [hookState, setHookState] = useState(init(initialArg));

  const state = useRef(hookState);
  const getState = () => state.current;
  const setState = newState => {
    state.current = newState;
    setHookState(newState);
  };
  const reduce = action => reducerFunction(getState(), action);
  const dispatch = action =>
    typeof action === "function"
      ? action(dispatch, getState)
      : setState(reduce(action));

  return [hookState, dispatch];
};

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
  console.log(action, action.payload);
  let newState = { ...state };
  switch (action.type) {
    case "CONT/data":
      newState = {
        ...newState,
        contacts: {
          ...state.contacts,
          data: { ...state.contacts.data, [action.payload.Id]: action.payload }
        }
      };
      break;
    case "REQ/data":
      newState = {
        ...newState,
        requests: {
          ...state.requests,
          data: { ...state.requests.data, [action.payload.Id]: action.payload }
        },
        requestId: action.payload.Id
      };
      break;
    case "REQ/Id":
      newState = {
        ...newState,
        requestId: action.payload.Id
      };
      break;
    case "CONT/Id": {
      newState = {
        ...newState,
        contactId: action.payload.Id
      };
      break;
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
          data: requests.reduce(
            (p, record) => ({
              ...p,
              [record.Id]: record
            }),
            {}
          ),
          size: requests.length,
          total: action.payload.total
        }
      };
    }
    case "REQ/update": {
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
    case "REQ/create_success": {
      const request = action.payload;
      newState = {
        ...state,
        requests: {
          ...state.requests,
          records: state.requests.records.concat(request),
          size: state.requests.size + 1,
          total: state.requests.total + 1
        }
      };
      break;
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
  console.log({ oldState: state, newState });
  return newState;
}

export default reducer;
