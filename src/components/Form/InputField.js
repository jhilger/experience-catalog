import React, { useContext, useEffect } from "react";
import Context from "../AdditionalFields/Context";
import FormContext from "./Context";

const InputField = ({
  name,
  label,
  placeholder = "",
  component = "input",
  includeInBlob,
  validate = () => {},
  children,
  type,
  styles = {},
  classes = {},
  className,
  rows,
  style,
  value
}) => {
  // eslint-disable-next-line no-unused-vars
  let [context, state, dispatch, dispatchLocal] = [{}, {}, () => {}, () => {}];
  try {
    [state, dispatch] = useContext(Context);
    // eslint-disable-next-line no-empty
  } catch (error) {}
  try {
    [context, dispatchLocal] = useContext(FormContext);
    // eslint-disable-next-line no-empty
  } catch (error) {}

  useEffect(() => {
    dispatchLocal({ type: "FIELD/insert", payload: { name, label } });
    dispatch({ type: "FIELD/insert", payload: { name, label } });
    return () => {
      dispatchLocal({ type: "FIELD/remove", payload: { name } });
      dispatch({
        type: "FIELD/remove",
        payload: { name }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, label]);

  return (
    <div className={className} style={style}>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label style={styles.label} className={classes.label} htmlFor={name}>
        {label}
      </label>
      {React.createElement(
        component,
        {
          style: styles.input,
          className: classes.input,
          id: name,
          type,
          name,
          value : value,
          rows : rows,
          onChange: e => {
            if (includeInBlob)
              dispatchLocal({
                type: "FIELD/change",
                payload: { value: e.target.value, name: e.target.name }
              });
            dispatch({
              type: "FIELD/change",
              payload: { value: e.target.value, name: e.target.name }
            });
          },
          onBlur: e => {
            if (includeInBlob)
              dispatchLocal({
                type: "FIELD/blur",
                payload: {
                  value: e.target.value,
                  name: e.target.name,
                  messages: validate(
                    { value: e.target.value, name: e.target.name },
                    state
                  )
                }
              });
            dispatch({
              type: "FIELD/blur",
              payload: {
                value: e.target.value,
                name: e.target.name
              }
            });
            (
              validate({ value: e.target.value, name: e.target.name }, state) ||
              []
            ).forEach(errorObj => {
              dispatchLocal({
                type: "FIELD/error",
                payload: {
                  message: errorObj.message,
                  name: errorObj.name,
                  type: errorObj.type
                }
              });
            });
          },
          onFocus: e => {
            if (includeInBlob)
              dispatchLocal({
                type: "FIELD/focus",
                payload: { value: e.target.value, name: e.target.name }
              });
            dispatch({
              type: "FIELD/focus",
              payload: { value: e.target.value, name: e.target.name }
            });
          },
          placeholder
        },
        children
      )}
    </div>
  );
};

export default InputField;
