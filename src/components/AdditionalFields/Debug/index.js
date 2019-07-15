import React, { useContext } from "react";
import Context from "../Context";
import DebugOutput from "./DebugOutput";

const Debug = ({ styles }) => {
  const [state] = useContext(Context);
  return <DebugOutput values={state} styles={styles} />;
};

export default Debug;
