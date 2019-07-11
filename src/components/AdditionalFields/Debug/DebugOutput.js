import React from "react";

const DebugOutput = ({ values, styles }) => (
  <div>
    <pre style={styles}>{JSON.stringify(values, null, 2)}</pre>
    <span dangerouslySetInnerHTML={{ __html: values[values.humanReadableFieldName] }} />
  </div>
);

export default DebugOutput;
