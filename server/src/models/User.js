/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const { BucketsApi } = require("forge-apis");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string" },
        cryptedPassword: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    const cadModel = require("./cadModel")
    const Bucket = require("./Bucket")

    return {
      bucket: {
        relation:Model.HasOneRelation,
        modelClass: Bucket,
        join: {
          from:"users.id",
          to: "buckets.userKey"
        } 
      },
      models: {
        relation: Model.ManyToManyRelation,
        modelClass: cadModel,
        join: {
          from:"users.id",
          through: {
            from:"buckets.userKey",
            to:"buckets.bucketKey",
          },
          to: "models.bucketKey"
        }
      }

    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
