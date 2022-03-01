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
        bucketKey: {type:"string"},
        userKey: {type:"string"}
      }
    }
  }
  static get relationMappings() {
    const User = require("./User.js")
    const cadModel = require("./cadModel.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "buckets.userKey",
          to: "users.id"
        }
      },
      models: {
        relation: Model.HasManyRelation,
        modelClass:cadModel,
        join: {
          from:"buckets.bucketKey",
          to: "models.bucketKey"
        }
      }
    }
  }
}

module.exports = Bucket