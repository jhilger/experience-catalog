import React, { useState } from "react";

const DebugOutput = ({ values, styles }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setCollapsed(!collapsed)}>
        Debug Output
      </button>
      {!collapsed && (
        <pre style={styles}>{JSON.stringify(values, null, 2)}</pre>
      )}
    </div>
  );
};

export default DebugOutput;
