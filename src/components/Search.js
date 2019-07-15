import React, { useContext, useEffect, useState, forwardRef } from "react";
import Context from "./Context";

const Search = (
  {
    sObject = "Account",
    searchField = "Name",
    inputName,
    className,
    name,
    onChange = () => {},
    onKeyDown = () => {},
    onBlur = () => {},
    style,
    fields = ["Name"],
    component = "input",
    limit = 5,
    value = "",
    ...props
  },
  ref
) => {
  const [context] = useContext(Context);
  const [displayValue, setDisplayValue] = useState(
    typeof value === "object" && value[searchField] ? value[searchField] : ""
  );
  const [query, setQuery] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [record, setRecord] = useState(typeof value === "object" ? value : {});
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (typeof value === "string" && value)
      context.jsforce.browser.connection.query(
        `SELECT ${searchField} FROM ${sObject} WHERE Id = '${value}'`,
        (err, result) => {
          if (err) return;
          if (!result) return;
          if (result.records.length) {
            setDisplayValue(result.records[0][searchField]);
            setPlaceholderValue(result.records[0][searchField]);
          }
          setRecord(result.records[0]);
        }
      );
    else if (typeof value === "object" && value[searchField]) {
      setPlaceholderValue(value[searchField]);
      setRecord(value);
      setDisplayValue(value[searchField]);
    } else if (!value) {
      setPlaceholderValue("");
      setRecord({});
      setDisplayValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (query)
      context.jsforce.browser.connection.query(query, (err, result) => {
        // eslint-disable-next-line no-console
        if (err) console.error(err);
        setRecords(result.records);
        onChange(displayValue, result.done, result.records);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return React.createElement(component, {
    className,
    ref,
    name,
    id: name,
    style,
    autoComplete: "new-password",
    onChange: e => {
      if (record && record[searchField] && record[searchField] === displayValue) {
        setRecord({});
      }
      // Fix this as it is causing an issue with displaying
      if (!e.target.value && record[searchField]) {
        onChange("", false, records);
        return setDisplayValue(record[searchField]);
      }
      setDisplayValue(e.target.value);

      if (e.target.value)
        setQuery(
          `SELECT Id, ${fields.join(
            ", "
          )} FROM ${sObject} WHERE ${searchField} LIKE '%${e.target.value.trim()}%' LIMIT ${limit}`
        );
    },
    onBlur,
    onKeyDown,
    placeholder: placeholderValue,
    value: displayValue,
    ...props
  });
};

export default forwardRef(Search);
