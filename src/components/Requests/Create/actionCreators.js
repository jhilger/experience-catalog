import { createOne, updateOne } from "../fetch";

export const onContactChange = record => (dispatch, getState) => {
  dispatch({
    type: "CONT/data",
    payload: record
  });
  dispatch({
    type: "CONT/Id",
    payload: record
  });
  dispatch({
    type: "REQ/data",
    payload: record
  });
};

export const onRequestCLick = request => (dispatch, getState) => {
  dispatch({
    type: "REQ/data",
    payload: request
  });
};

export const onSubmit = (onSuccess, ev, record, rest) => dispatch => {
  console.log(ev, rest);
  dispatch(createOne(record, onSuccess));
};

export const onSubmitUpdate = (
  onSuccess,
  request,
  ev,
  record,
  rest
) => dispatch => {
  console.log(request);
  const oldRecord = record.Id;
  dispatch(updateOne(request, oldRecord, onSuccess));
};
