/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect, useContext } from "react";
import { SingleDatePicker } from "react-dates";
import FormContext from "./Form/Context";
import AdditionalFieldsContext from "./AdditionalFields/Context";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../scss/datepicker.scss";

const SingleDatePickerWrapper = ({
  name,
  label,
  placeholder,
  validate = () => {},
  className,
  value
}) => {
  const [focused, setFocused] = useState(false);
  const [date, setDate] = useState(value);

  // eslint-disable-next-line no-unused-vars
  let [
    // eslint-disable-next-line no-unused-vars
    context,
    // eslint-disable-next-line no-unused-vars
    state,
    dispatch,
    dispatchLocal,
    // eslint-disable-next-line no-unused-vars
    addedFieldsContext,
    // eslint-disable-next-line no-unused-vars
    addedFieldsDispatch
  ] = [{}, {}, () => {}, () => {}];
  try {
    [context, dispatchLocal] = useContext(FormContext);
    // eslint-disable-next-line no-empty
  } catch (error) {}
  try {
    [addedFieldsContext, addedFieldsDispatch] = useContext(
      AdditionalFieldsContext
    );
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
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <SingleDatePicker
        numberOfMonths={1}
        openDirection="up"
        id={name}
        placeholder={placeholder}
        date={date}
        focused={focused}
        required
        onDateChange={d => {
          setDate(d);
          dispatchLocal({
            type: "FIELD/change",
            payload: { value: d, name }
          });
          dispatch({
            type: "FIELD/change",
            payload: { value: d, name }
          });
        }}
        onFocusChange={() => setFocused(!focused)}
      />
    </div>
  );
};

export default SingleDatePickerWrapper;
