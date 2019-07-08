import React from "react";

const DebugOutput = ({ values, styles }) => {
  return <div>
    <pre style={styles}>{JSON.stringify(values, null, 2)}</pre>
  </div>;
};

export default DebugOutput;
