import React, { useContext, useEffect } from "react";
import Context from "./Context";

const Field = ({
  name,
  label,
  placeholder = "",
  type,
  styles = {},
  classes = {},
  className,
  style
}) => {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    dispatch({ type: "FIELD/insert", payload: { name, label } });
    return () =>
      dispatch({
        type: "FIELD/remove",
        payload: { name }
      });
  }, [name, label]);
  return (
    <div className={className} style={style}>
      <label style={styles.label} className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        style={styles.input}
        className={classes.input}
        id={name}
        type={type}
        name={name}
        onChange={e =>
          dispatch({
            type: "FIELD/change",
            payload: { value: e.target.value, name: e.target.name }
          })
        }
        onBlur={e =>
          dispatch({
            type: "FIELD/blur",
            payload: { value: e.target.value, name: e.target.name }
          })
        }
        onFocus={e =>
          dispatch({
            type: "FIELD/focus",
            payload: { value: e.target.value, name: e.target.name }
          })
        }
        placeholder={placeholder}
      />
    </div>
  );
};

export default Field;
