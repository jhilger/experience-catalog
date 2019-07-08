import React, { useContext } from "react";
import Context from "./Context";

const Form = ({ onSubmit: handleSubmit = () => {}, children, ...props }) => {
  const [state, dispatch, context] = useContext(Context);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        context.form.handleSubmit(e, state.values, context)
      }}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
