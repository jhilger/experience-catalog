import React, { useReducer } from "react";
import Context from "./Context";
import InputField from "./InputField";
import Debug from "./Debug";
import Form from "./Form";
import reducer from "./reducer";

const FormWrapper = ({
  onSubmit: handleSubmit,
  initialValues = {},
  children,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, { initialValues });
  return (
    <Context.Provider
      value={[state, dispatch, { form: { handleSubmit, initialValues } }]}
    >
      <Form {...props}>{children}</Form>
    </Context.Provider>
  );
};

export default FormWrapper;
export { InputField, Debug };
