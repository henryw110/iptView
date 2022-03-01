const Model = require("./Model.js")

class cadModel extends Model {
  static get tableName() {
    return "models"
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["objectId", "objectKey", "bucketKey"],
      properties: {
        objectId: { type: "string" },
        objectKey: { type: "string" },
        bucketKey: { type: "string" }
      }
    }
  }
  static get relationMappings() {
    const User = require("./User.js")
    const Bucket = require("./Bucket.js")

    return {
      user: {
        relation:Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from:"models.bucketKey",
          through: {
            from:"buckets.bucketKey",
            to:"buckets.userKey"
          },
          to:"users.id"
        }


      }
    }
  }
}

module.exports = cadModel