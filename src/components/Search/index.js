import React, { useEffect, useState, forwardRef } from "react";
import { DataService } from "forcejs";

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
    style = { color: "black" },
    fields = ["Name"],
    component = "input",
    limit = 5,
    value = "",
    ...props
  },
  ref
) => {
  const [displayValue, setDisplayValue] = useState(
    typeof value === "object" && value[searchField] ? value[searchField] : ""
  );
  const [query, setQuery] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [record, setRecord] = useState(typeof value === "object" ? value : {});
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (typeof value === "string" && value && [15, 18].includes(value.length)) {
      const service = DataService.getInstance();
      service
        .query(`SELECT ${searchField} FROM ${sObject} WHERE Id = '${value}'`)
        .then(result => {
          if (!result) return;
          if (result.records.length) {
            setDisplayValue(result.records[0][searchField]);
            setPlaceholderValue(result.records[0][searchField]);
          }
          setRecord(result.records[0]);
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err));
    } else if (typeof value === "object" && value[searchField]) {
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
    if (query) {
      const service = DataService.getInstance();
      service
        .query(query)
        .then(result => {
          setRecords(result.records);
          onChange(displayValue, result.done, result.records);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return React.createElement(component, {
    className,
    ref,
    name,
    id: name,
    style: {
      ...style,
      color: !record.Id ? style.color || "black" : "transparent",
      textShadow: record.Id ? `0 0 0 ${style.color || "black"}` : "none",
      cursor: record.Id ? "pointer" : "auto"
    },
    autoComplete: "new-password",
    onChange: e => {
      if (
        record &&
        record[searchField] &&
        record[searchField] === displayValue
      ) {
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
