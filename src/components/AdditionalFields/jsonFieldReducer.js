const defaultFieldState = {
  name: null,
  value: ""
};

const jsonFieldNameReducer = (state = {}, action) => {
  switch (action.type) {
    case "FIELD/insert":
    case "FIELD/change":
    case "FIELD/blur":
    case "FIELD/focus":
      return {
        ...state,
        [action.payload.name]: fieldReducer(state[action.payload.name], action)
      };
    case "FIELD/remove":
      return {
        ...state,
        [action.payload.name]: undefined
      };
    default:
      return state;
  }
};

const fieldReducer = (state = defaultFieldState, action) => {
  switch (action.type) {
    case "FIELD/insert":
      return {
        ...state,
        name: action.payload.name,
        label: action.payload.label
      };
    case "FIELD/change":
      return {
        ...state,
        value: action.payload.value
      };
    case "FIELD/remove":
      return {
        ...state
      };
    case "FIELD/blur":
      return {
        ...state
      };
    case "FIELD/focus":
      return {
        ...state
      };
    default:
      return state;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FIELD/insert":
    case "FIELD/remove":
    case "FIELD/change":
    case "FIELD/blur":
    case "FIELD/focus":
      return {
        ...state,
        [state.jsonFieldName]: jsonFieldNameReducer(
          state[state.jsonFieldName],
          action
        )
      };
    default:
      return state;
  }
};

export default reducer;
