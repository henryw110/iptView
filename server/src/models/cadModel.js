const Model = require("./Model.js")

class cadModel extends Model {
  static get tableName() {
    return "models"
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["modelUrn", "modelName"],
      properties: {
        modelName: { type: "string" },
        modelUrn: { type: "string" }
      }
    }



  }
}

module.exports = cadModel