class Base {
  constructor(key, model) {
    this.key = key;
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
  }

  list() {
    return this.model
      .find({})
      .then(result => {
        const response = {};
        response["status"] = "ok";
        response[this.modelName] = result;
        return response;
      })
      .catch(error => console.log(error));
  }

  create(data) {
    return this.model
      .create(data)
      .then(result => {
        const response = {};
        response["status"] = "ok";
        response["message"] = "Data was added Successfully";
        response["data"] = result;
        return response;
      })
      .catch(error => {
        const response = {
          status: "error",
          message: "There was an Error adding this data",
          error,
          data
        };
        return response;
      });
  }

  delete(query) {
    return this.model.findOneAndRemove(query).then(result => {
      const response = {};
      response["status"] = "ok";
      return response;
    });
  }

  show() {
    console.log(this.key);
  }
}

module.exports = Base;
