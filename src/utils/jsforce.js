import DataService from "forcejs/dist/force.data-service";

const performQuery = (jsforce, query) => {
  // return new Promise((resolve, reject) => {

  //   jsforce.browser.connection.query(query, (err, result) => {
  //     if (err) return reject(err);
  //     return resolve(result);
  //   });
  // });
  const service = DataService.getInstance();
  if (!service) return;
  return service.query(query);
};

const createSObject = (jsforce, objectName, record) =>
  new Promise((resolve, reject) => {
    // const service = DataService.getInstance();
    jsforce.browser.connection
      .sobject(objectName)
      .create(record, (err, newRecord) => {
        if (err) return reject(err);
        return resolve(newRecord);
      });
  });

export { performQuery, createSObject };
