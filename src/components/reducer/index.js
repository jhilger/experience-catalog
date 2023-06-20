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
const getRecordList = (recordData, recordIds) =>
  recordIds.map(id => recordData[id]);
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

const filterItems = (query, experiences) => {
  let index = 0;
  return experiences.map(experience => {
    if (query === "home") {
      experience.display = true;
    } else {
      experience.display =
        experience.Experience_Type2__r.Short_Name__c === query ||
        (experience.Pricing_Tier__r &&
          experience.Pricing_Tier__r.Name === query);
    }
    if (experience.display) {
      experience.index = index;
      // eslint-disable-next-line no-plusplus
      index++;
    }
    return experience;
  });
};
function reducer(state = defaultState, action) {
  if (process.env.NODE_ENV !== "production")
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
        ...getRecordList(state.experiences.data, state.experiences.records),
        ...action.payload.records
      ];
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
          tiers: experiences
            .map(experience => experience.Pricing_Tier__r)
            .filter(tier => tier)
            .filter(
              (tier, i, arr) => arr.findIndex(v => v.Id === tier.Id) === i
            )
            .sort((a, b) => a.Sorting_Order__c - b.Sorting_Order__c),
          types: experiences
            .map(experience => experience.Experience_Type2__r)
            .filter(
              (type, i, arr) => arr.findIndex(v => v.Id === type.Id) === i
            )
        }
      };
    }
    case "TIER/init": {
      return {
        ...state,
        tiers: action.payload.records
      };
    }
    case "REQ/init": {
      const requests = [...action.payload.records];
      // const requestsData = getRecordData(requests, "Id");
      const requestsIds = getRecordIds(requests, "Id");

      newState = {
        ...state,
        requests: {
          records: requestsIds,
          data: requests.reduce(
            (previous, current) => ({
              ...previous,
              [current.Id]: current
            }),
            {}
          ),
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
      break;
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
