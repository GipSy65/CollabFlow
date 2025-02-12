const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Permission = sequelize.define("Permission", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports = Permission;