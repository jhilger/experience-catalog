import { useRef, useState } from "react";
import defaultState from "../defaultState";

const onlyUniqueId = (v, i, recordArray) =>
  recordArray.findIndex(record => record.Id === v.Id) === i;

const getRecordData = (records, uniqueId) =>
  records.reduce(
    (previousObj, record) => ({
      ...previousObj,
      [record[uniqueId]]: record
    }),
    {}
  );
const requestSubmitted = () => {
  const currentDateTime = Date.now();
  return req =>
    currentDateTime < new Date(req.Event_Date__c).getTime() &&
    req.Status__c === "Submitted";
};
const requestApproved = () => {
  const currentDateTime = Date.now();
  return req =>
    currentDateTime < new Date(req.Event_Date__c).getTime() &&
    req.Status__c === "Approved";
};

const getRecordIds = (records, uniqueId) =>
  records.filter(onlyUniqueId).map(record => record[uniqueId]);

const getFullRecords = (recordIds, data) => recordIds.map(Id => data[Id]);
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
  console.log(JSON.stringify(action.type));
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
    case "EXP/data":
      newState = {
        ...newState,
        experiences: {
          ...state.experiences,
          data: {
            ...state.experiences.data,
            [action.payload.Id]: action.payload
          }
        },
        experienceId: action.payload.Id
      };
      break;
    case "EXP/remove_data": {
      return {
        ...state,
        experienceId: null
      };
    }
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
      const experiences = [
        ...state.experiences.records,
        ...action.payload.records
      ];
      console.log(action.payload);
      const experienceData = getRecordData(experiences, "Id");
      const experienceIds = getRecordIds(experiences, "Id");
      return {
        ...state,
        experiences: {
          ...state.experiences,
          records: experienceIds,
          data: experienceData,
          filtered: filterItems(
            state.experiences.filter,
            getFullRecords(experienceIds, experienceData)
          ),
          size: experiences.length,
          total: action.payload.total,
          types: {
            data: experiences.reduce(
              (previous, experience) => ({
                ...previous,
                [experience.Experience_Type2__r.Id]:
                  experience.Experience_Type2__r
              }),
              {}
            ),
            list: experiences
              .map(experience => experience.Experience_Type2__r.Id)
              .filter((Id, i, arr) => arr.findIndex(v => v === Id) === i)
          }
        }
      };
    }
    case "REQ/init": {
      const requests = [...state.requests.records, ...action.payload.records];
      const requestsData = getRecordData(requests, "Id");
      const requestsIds = getRecordIds(requests, "Id");

      const currentDateTime = new Date().getTime();
      return {
        ...state,
        requests: {
          records: requestsIds,
          data: requestsData,
          submitted: getRecordIds(
            requests.filter(onlyUniqueId).filter(requestSubmitted()),
            "Id"
          ),
          approved: getRecordIds(
            requests.filter(onlyUniqueId).filter(requestApproved()),
            "Id"
          ),
          size: requests.length,
          total: action.payload.total
        }
      };
    }
    case "REQ/create_success": {
      const request = action.payload.records[0];
      newState = {
        ...state,
        requests: {
          ...state.requests,
          data: {
            ...state.requests.data,
            [request.Id]: request
          },
          submitted: [
            ...state.requests.submitted,
            ...(requestSubmitted()(request) ? [request.Id] : [])
          ],
          records: state.requests.records.concat(request),
          size: state.requests.size + 1,
          total: state.requests.total + 1
        }
      };
      break;
    }
    case "EXP/add": {
      const experiences = [
        ...state.experiences.records,
        ...action.payload.records
      ];
      const experienceData = getRecordData(experiences, "Id");
      const experienceIds = getRecordIds(experiences, "Id");
      return {
        ...state,
        experiences: {
          ...state.experiences,
          records: experiences,
          filtered: filterItems(
            state.experiences.filter,
            getFullRecords(experienceIds, experienceData)
          ),
          size: experiences.length,
          total: action.payload.total
        }
      };
    }
    case "EXP/filtered": {
      return {
        ...state,
        experiences: {
          ...state.experiences,
          filtered: filterItems(
            action.payload.selected,
            getFullRecords(state.experiences.records, state.experiences.data)
          ),
          filter: action.payload.selected
        }
      };
    }
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
  // eslint-disable-next-line no-console
  console.log(newState);
  return newState;
}

export default reducer;
