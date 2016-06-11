'use strict';
class Db {
  constructor() {
  }
  connect(mongodb) {
    this.mongodb = mongodb;
  }
  collection (collectionName) {
    return {
      insert: (data, callback) => {
        this.mongodb.collection(collectionName).insert(data, function (err, result) {
          if (err) {
            return callback(err);
          }
          return callback(err, result);
        });
      }
    }
  }
}
module.exports = new Db();