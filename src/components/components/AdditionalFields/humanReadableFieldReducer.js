const reducer = (
  state,
  formatting = { before: "", between: "\n", field: c => `${c.label}: ${c.value}`, after: "" }
) => {
  return {
    ...state,
    [state.humanReadableFieldName]: formatting.before + state.fields
      .map(field => state[state.jsonFieldName][field])
      .reduce((p, c) => [...p, c.value ? formatting.field(c) : ""], [])
      .filter(v => v)
      .join(formatting.between) + formatting.after
  };
};

export default reducer;
