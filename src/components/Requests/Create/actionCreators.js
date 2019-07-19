import { createOne } from "../fetch";

export const onContactChange = record => (dispatch, getState) => {
  dispatch({
    type: "CONT/data",
    payload: record
  });
  dispatch({
    type: "CONT/Id",
    payload: record
  });
};

export const onSubmit = (onSuccess, ev, record, rest) => dispatch => {
  dispatch(createOne(record, onSuccess));
};
