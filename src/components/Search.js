import React, { useEffect, useState, forwardRef } from "react";
import DataService from "forcejs/dist/force.data-service";

const Search = (
  {
    sObject = "Account",
    searchField = "Name",
    labelFormat = item => item[searchField],
    extraFilterPhrase = "",
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
    } else if (typeof value === "object" && labelFormat(value)) {
      setPlaceholderValue(labelFormat(value));
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
