import { DataService } from "forcejs";

const performQuery = (jsforce, query) => {
  // return new Promise((resolve, reject) => {

  //   jsforce.browser.connection.query(query, (err, result) => {
  //     if (err) return reject(err);
  //     return resolve(result);
  //   });
  // });
  const service = DataService.getInstance();
  return service.query(query);
};

const createSObject = (jsforce, objectName, record) =>
  new Promise((resolve, reject) => {
    jsforce.browser.connection
      .sobject(objectName)
      .create(record, (err, newRecord) => {
        console.log(record);

        if (err) return reject(err);
        return resolve(newRecord);
      });
  });

const updateSOjbect = (jsforce, objectName, oldRecord, newRecord) =>
  new Promise((resolve, reject) => {
    jsforce.browser.connection
      .sobject(objectName)
      .update(
        { Id: oldRecord, Contact_to_Invite__c: newRecord },
        (err, updateRecord) => {
          console.log(oldRecord);
          console.log(newRecord);

          if (err) return reject(err);
          return resolve(updateRecord);
        }
      );
  });
export { performQuery, createSObject, updateSOjbect };
