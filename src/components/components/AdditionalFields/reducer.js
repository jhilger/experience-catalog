import jsonFieldName from "./jsonFieldReducer";
import humanReadableFieldName from "./humanReadableFieldReducer";

const fieldsReducer = (oldState = [], action) => {
  switch (action.type) {
    case "FIELD/insert":
      return oldState.concat(action.payload.name);

    case "FIELD/remove":
      return oldState.filter(v => v !== action.payload.name);
    default:
      return oldState;
  }
};

const reducer = (formatting, onChange) => (
  oldState,
  action
) => {
  const newState = {
    ...oldState,
    ...humanReadableFieldName(
      jsonFieldName(oldState, action),
      formatting
    ),
    fields: fieldsReducer(oldState.fields, action)
  };
  onChange({
    [newState.jsonFieldName]: JSON.stringify(newState[newState.jsonFieldName]),
    [newState.humanReadableFieldName]: newState[newState.humanReadableFieldName]
  });
  // console.log({ oldState, action, newState });
  return newState;
};

export default reducer;
