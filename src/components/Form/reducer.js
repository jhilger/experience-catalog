const fieldReducer = (state = {}, action, originalValue) => {
  switch (action.type) {
    case "FIELD/insert":
      return {
        ...state,
        value: "",
        focus: false,
        dirty: false,
        touched: false,
        messages: []
      };
    case "FIELD/change":
      return {
        ...state,
        value: action.payload.value,
        record: action.payload.record
      };
    case "FIELD/error":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            message: action.payload.message,
            type: action.payload.type
          }
        ]
      };
    case "FIELD/blur":
      return {
        ...state,
        focus: false,
        touched: true,
        dirty: state.value !== (originalValue || ""),
        messages: []
      };
    case "FIELD/focus":
      return {
        ...state,
        focus: true
      };
    default:
      return state;
  }
};

const fieldsReducer = (state = {}, action, mainState) => {
  if (action.type === "FIELD/remove")
    return {
      ...state,
      [action.payload.name]: undefined
    };
  return {
    ...state,
    [action.payload.name]: fieldReducer(
      state[action.payload.name],
      action,
      mainState.initialValues[action.payload.name]
    )
  };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FIELD/insert":
    case "FIELD/change":
    case "FIELD/blur":
    case "FIELD/focus":
    case "FIELD/error":
      return {
        ...state,
        fields: fieldsReducer(state.fields, action, state),
        values: valueReducer(state.values, action)
      };
    case "FIELD/remove":
      return {
        ...state,
        [action.payload.name]: undefined,
        values: valueReducer(state.values, action)
      };
    case "FIELD/mergeValues":
      return {
        ...state,
        values: valueReducer(state.values, action)
      };
    default:
      return state;
  }
};

const valueReducer = (state = {}, action) => {
  switch (action.type) {
    case "FIELD/insert":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case "FIELD/change":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case "FIELD/blur":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case "FIELD/focus":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case "FIELD/remove":
      return {
        ...state,
        [action.payload.name]: undefined
      };
    case "FIELD/mergeValues":
      return {
        ...state,
        ...action.payload.values
      };
    default:
      return state;
  }
};

export default reducer;
