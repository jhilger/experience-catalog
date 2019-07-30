import { performQuery, createSObject } from "../../utils/jsforce";

export const fetchAll = () => async (dispatch, getState) => {
  const { jsforce, user } = getState();
  const result = await performQuery(
    jsforce,
    [
      "SELECT",
      [
        "Id",
        "Status__c",
        "Contact_to_Invite__r.Name",
        "Event_Date__c",
        // eslint-disable-next-line prettier/prettier
      "Name",
      ].join(", "),
      "FROM Strategic_Partner_Request__c",
      "WHERE",
      [`Requester__c = '${user.user_id}'`].join(" AND ")
    ].join(" ")
  );
  return result;
};

export const fetchOne = id => async (dispatch, getState) => {
  const { jsforce, user } = getState();
  const result = await performQuery(
    jsforce,
    [
      "SELECT",
      [
        "Id",
        "Status__c",
        "Contact_to_Invite__r.Name",
        "Event_Date__c",
        // eslint-disable-next-line prettier/prettier
      "Name",
      ].join(", "),
      "FROM Strategic_Partner_Request__c",
      "WHERE",
      [`Requester__c = '${user.user_id}'`, `Id = '${id}'`].join(" AND ")
    ].join(" ")
  );
  return result;
};

export const createOne = (
  record,
  onSuccess = () => {},
  onFailure = () => {}
) => async (dispatch, getState) => {
  const { jsforce } = getState();
  dispatch({
    type: "REQ/create_init"
  });
  try {
    const newRecord = await createSObject(
      jsforce,
      "Strategic_Partner_Request__c",
      record
    );
    const returnResult = await fetchOne(newRecord.id)(dispatch, getState);
    dispatch({
      type: "REQ/create_success",
      payload: returnResult
    });
    onSuccess();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    dispatch({
      type: "REQ/create_failure",
      payload: {
        message: error.message
      }
    });
    onFailure();
  }
};
