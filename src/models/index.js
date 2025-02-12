const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");


const User = require("./User")(sequelize);


const db = {
    sequelize,
    Sequelize,
    User,
}

module.exports = db;