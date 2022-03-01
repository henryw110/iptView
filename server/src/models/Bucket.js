const Model = require ("./Model.js")

class Bucket extends Model {
  static get tableName() {
    return "buckets"
  }
  static get jsonSchema() {
    return {
      type:"object",
      required: ["bucketKey"],
      properties: {
        bucketKey: {type:"string",minLength: 1, maxLength: 500},
        userKey: {type:"string",minLength: 1, maxLength: 500}
      }
    }
  }
  static get relationMappings() {
    const User = require("./User.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "buckets.userKey",
          to: "users.id"
        }

      }
    }
  }
}

module.exports = Bucket