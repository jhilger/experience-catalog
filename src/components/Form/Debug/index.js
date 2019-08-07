import React, { useContext } from "react";
import Context from "../Context";
import DebugOutput from "./DebugOutput";

const Debug = ({ styles }) => {
  if (process.env.NODE_ENV === "production") return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state] = useContext(Context);
  return <DebugOutput values={state} styles={styles} />;
};

export default Debug;
