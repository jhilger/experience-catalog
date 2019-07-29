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

export { performQuery };
