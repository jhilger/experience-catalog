import { performQuery } from "../../utils/jsforce";

const loadedQuery = (jsforce, { user, contactId }, dispatch) =>
  Promise.all([
    performQuery(
      jsforce,
      [
        "SELECT",
        [
          "Id",
          "Strategic_Partner__r.account__r.Name",
          "Name",
          "Experience_Type__c",
          "Strategic_Partner__c",
          "Info__c",
          "Keep_In_Mind__c",
          "Experience_Type2__r.Id",
          "Experience_Type2__r.Name",
          "Experience_Type2__r.Image_Path__c",
          "Experience_Type2__r.Short_Name__c",
          "Experience_Type2__r.Alt_Text__c",
          "Partnership_Details_Requirements__c",
          // eslint-disable-next-line prettier/prettier
          "Image_URL__c",
        ].join(", "),
        "FROM Experience__c",
        // eslint-disable-next-line prettier/prettier
  "WHERE Strategic_Partner__r.Status__c = 'Current Partner'",
      ].join(" ")
    ),
    performQuery(
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
    ),
    contactId &&
      performQuery(
        jsforce,
        [
          "SELECT",
          ["Id", "Name"].join(", "),
          "FROM Contact",
          // eslint-disable-next-line prettier/prettier
        `WHERE ID = '${contactId}'`,
        ].join(" ")
      )
  ])
    .then(([newExperiences, partnerRequests, contact]) => {
      const { records } = newExperiences;
      if (contact && contact.records[0])
        dispatch({
          type: "CONT/data",
          payload: contact.records[0]
        });
      dispatch({
        type: "EXP/init",
        payload: { records, total: newExperiences.totalSize }
      });
      dispatch({
        type: "REQ/init",
        payload: {
          records: partnerRequests.records,
          total: partnerRequests.totalSize
        }
      });
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err);
      dispatch({
        type: "ERROR",
        payload: err
      });
    });

export default loadedQuery;
