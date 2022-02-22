/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
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

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
// $2b$10$/7MIi/3iLy/EwR1Tycoo/e1ILZ1vJGdHz9FsJa0oRLoTuusUW0xZm
// $2b$10$2x3wEU2EXg3JlfXp.56AtOh3nhpuD6sSMSP2uw/MoqZV649EcaJDi
// $2b$10$ITSb4yXvpWMrfvprDkdFK.0In5MoKNvdM5AzyVibqCP/SpCLk/44K