import React, { useState, useRef, useEffect, useContext } from "react";
import Search from "./Search";
import DropDown from "./DropDown";
import FormContext from "./Form/Context";
import AdditionalFieldsContext from "./AdditionalFields/Context";

const TypeAhead = ({ value: Id, onChange = () => {}, name, label }) => {
  const ref = useRef();
  const menuRef = useRef();
  const [records, setRecords] = useState();
  const [record, setRecord] = useState(Id ? { Id } : "");
  const [hovered, setHovered] = useState(null);

  // eslint-disable-next-line no-unused-vars
  let [formContext, addedFieldsContext, formDispatch, addedFieldsDispatch] = [{}, {}, () => {}, () => {}];
  try {
    [formContext, formDispatch] = useContext(FormContext);
    // eslint-disable-next-line no-empty
  } catch (error) {}
  try {
    [addedFieldsContext, addedFieldsDispatch] = useContext(AdditionalFieldsContext);
    // eslint-disable-next-line no-empty
  } catch (error) {}
  const clearValues = () => {
    setRecord("");
    onChange("");
    formDispatch({
      type: "FIELD/change",
      payload: { value: "", name }
    });
    addedFieldsDispatch({
      type: "FIELD/change",
      payload: { value: "", name }
    });
  };
  const onBlur = e => {
    if (menuRef.current && !menuRef.current.mouseOver) return setRecords([]);
  };
  const downKey = e => {
    if (typeof hovered !== "string") return setHovered(records[0].Id);
    const index = records.findIndex(v => v.Id === hovered);
    if (index === records.length - 1) return;
    return setHovered(records[index + 1].Id);
  };
  const upKey = e => {
    if (typeof hovered !== "string") return setHovered(records[records.length - 1].Id);
    const index = records.findIndex(v => v.Id === hovered);
    if (!index) return;
    return setHovered(records[index - 1].Id);
  };
  const enterKey = e => {
    if (!hovered) return;
    e.preventDefault();
    const newRecord = records.find(v => v.Id === hovered);
    setRecord(newRecord);

    formDispatch({ type: "FIELD/change", payload: { value: newRecord.Id, name } });
    addedFieldsDispatch({
      type: "FIELD/change",
      payload: { value: newRecord.Name, name }
    });
    setRecords([]);
    setHovered(null);
  };
  const backspaceKey = e => {
    if (typeof record === "string" && record) return;
    if (record.Id) {
      e.preventDefault();
      clearValues();
    }
  };
  const escKey = e => {
    e.preventDefault();
    clearValues();
    setRecords([]);
    setHovered(null);
  };
  const tabKey = e => {
    // console.log(e);
  };
  useEffect(() => {
    formDispatch({ type: "FIELD/insert", payload: { name, label } });
    addedFieldsDispatch({ type: "FIELD/insert", payload: { name, label } });
    return () => {
      formDispatch({ type: "FIELD/remove", payload: { name } });
      addedFieldsDispatch({
        type: "FIELD/remove",
        payload: { name }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, label]);
  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <div style={{ display: "inline-block" }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={name}>{label}</label>
        <Search
          ref={ref}
          onChange={(searchValue, more, newRecords) => {
            if (JSON.stringify(newRecords) === JSON.stringify(records)) return;
            setRecords(newRecords);
            setRecord(searchValue);
          }}
          onBlur={onBlur}
          type="text"
          hovered={hovered}
          inputName={name}
          onKeyDown={e => {
            switch (e.keyCode) {
              case 40:
                return downKey(e);
              case 9:
                return tabKey(e);
              case 38:
                return upKey(e);
              case 13:
                return enterKey(e);
              case 27:
                return escKey(e);
              case 8:
              case 46:
                return backspaceKey(e);
              default:
                break;
            }
          }}
          value={record}
          autoComplete="new-password"
        />
        {record.Id && (
          <button
            type="button"
            onClick={() => {
              clearValues();
              ref.current.focus();
            }}
          >
            X
          </button>
        )}
      </div>

      <DropDown
        ref={menuRef}
        list={records}
        hovered={hovered}
        labelField="Name"
        onHover={setHovered}
        onItemClicked={newRecord => {
          setRecords([]);
          setRecord(newRecord);
          onChange(newRecord);

          formDispatch({
            type: "FIELD/change",
            payload: { value: newRecord.Id, name }
          });
          addedFieldsDispatch({
            type: "FIELD/change",
            payload: { value: newRecord.Name, name }
          });
        }}
      />
    </div>
  );
};

export default TypeAhead;
