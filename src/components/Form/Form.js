import React, { useContext } from "react";
import Context from "./Context";

const Form = ({ onSubmit: handleSubmit = () => {}, children, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch, context] = useContext(Context);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        context.form.handleSubmit(e, state.values, context);
      }}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
