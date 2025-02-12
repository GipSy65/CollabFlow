const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./Project");

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("pending", "in_progress", "completed", "on_hold", "cancelled"),
        defaultValue: "pending",
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Project,
            key: "id",
        },
    },
    assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Project.hasMany(Task, { foreignKey: "projectId", onDelete: "CASCADE" });
Task.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Task;
