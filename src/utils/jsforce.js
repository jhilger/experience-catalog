const performQuery = (jsforce, query) =>
  new Promise((resolve, reject) => {
    jsforce.browser.connection.query(query, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

export { performQuery };
