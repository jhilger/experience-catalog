import React, { useEffect, useState, forwardRef } from "react";
import DataService from "forcejs/dist/force.data-service";

const Search = (
  {
    // eslint-disable-next-line react/prop-types
    sObject = "Account",
    // eslint-disable-next-line react/prop-types
    searchField = "Name",
    // eslint-disable-next-line react/prop-types
    labelFormat = item => item[searchField],
    // eslint-disable-next-line react/prop-types
    extraFilterPhrase = "",
    // eslint-disable-next-line react/prop-types
    inputName,
    // eslint-disable-next-line react/prop-types
    className,
    // eslint-disable-next-line react/prop-types
    required,
    // eslint-disable-next-line react/prop-types
    name,
    // eslint-disable-next-line react/prop-types
    onChange = () => {},
    // eslint-disable-next-line react/prop-types
    onKeyDown = () => {},
    // eslint-disable-next-line react/prop-types
    onBlur = () => {},
    // eslint-disable-next-line react/prop-types
    style = { color: "black" },
    // eslint-disable-next-line react/prop-types
    fields = ["Name"],
    // eslint-disable-next-line react/prop-types
    component = "input",
    // eslint-disable-next-line react/prop-types
    limit = 5,
    // eslint-disable-next-line react/prop-types
    value = "",
    ...props
  },
  ref
) => {
  const [displayValue, setDisplayValue] = useState(
    typeof value === "object" && labelFormat(value) ? labelFormat(value) : ""
  );
  const [query, setQuery] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [record, setRecord] = useState(typeof value === "object" ? value : {});
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const service = DataService.getInstance();
    if (
      typeof value === "string" &&
      value &&
      [15, 18].includes(value.length) &&
      !value.split("").includes(" ")
    ) {
      service
        .query(`SELECT ${searchField} FROM ${sObject} WHERE Id = '${value}'`)
        .then(result => {
          if (!result) return;
          if (result.records.length) {
            setDisplayValue(labelFormat(result.records[0]));
            setPlaceholderValue(labelFormat(result.records[0]));
          }
          setRecord(result.records[0]);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    } else if (typeof value === "object" && value[searchField]) {
      setPlaceholderValue(value[searchField]);
      setRecord(value);
      setDisplayValue(labelFormat(value));
    } else if (!value) {
      setPlaceholderValue("");
      setRecord({});
      setDisplayValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const service = DataService.getInstance();
    if (query)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return React.createElement(component, {
    className,
    ref,
    required,
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
        return setDisplayValue(labelFormat(value));
      }
      setDisplayValue(e.target.value);

      if (e.target.value)
        setQuery(
          `SELECT Id, ${fields.join(
            ", "
          )} FROM ${sObject} WHERE ${searchField} LIKE '%${e.target.value.trim()}%'${
            extraFilterPhrase ? ` AND ${extraFilterPhrase}` : extraFilterPhrase
          } LIMIT ${limit}`
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
