import React, { useReducer, useContext } from "react";
import Context from "./Context";
import FormContext from "../Form/Context";
import reducer from "./reducer";
import Field from "./Field";
import Debug from "./Debug";

const AdditionalFields = ({
  jsonFieldName,
  humanReadableFieldName,
  formatting = {
    before: "",
    between: "\n",
    field: c => `${c.label}: ${c.value}`,
    after: ""
  },
  // eslint-disable-next-line no-console
  onChange = () =>
    console.log("You need to assign an onChange to `AdditionalFields`"),
  children
}) => {
  let initialState = {};
  // eslint-disable-next-line no-unused-vars
  let [formState, formDispatch, context] = [{}, () => {}];
  try {
    [formState, formDispatch, context] = useContext(FormContext);
    // eslint-disable-next-line no-empty
  } catch (error) {}
  if (context) {
    initialState = {
      [jsonFieldName]: context.form.initialValues[jsonFieldName],
      [humanReadableFieldName]:
        context.form.initialValues[humanReadableFieldName]
    };
  }
  const [state, dispatch] = useReducer(
    reducer(formatting, values => {
      formDispatch({
        type: "FIELD/mergeValues",
        payload: {
          values
        }
      });
      onChange(values);
    }),
    { jsonFieldName, humanReadableFieldName, fields: [], ...initialState }
  );
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default AdditionalFields;

export { Field, Debug };
