import React, { useContext } from "react";
import Context from "../../../Context";

const SingleRequestView = ({ id }) => {
  const [{ request }] = useContext(Context);
  return <div>Nothing Here Yet!</div>;
};

export default SingleRequestView;
