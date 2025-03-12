const {getSocketIo} = require("../sockets/socket");
const Task = require("../models/Task");
const User = require("../models/User");



exports.assignTask = async (req, res) => {
    try {
        const { taskId, userId } = req.params;

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        task.assignedTo = userId;
        await task.save();
        const io = getSocketIo();

        io.emit("taskAssigned", {taskId,userId});
        res.status(200).json({ message: "Task assigned successfully", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, projectId, assignTo } = req.body;
        const newTask = await Task.create({
            title,
            description,
            status,
            projectId,
            assignTo
        });
        const io = getSocketIo();

        io.emit("newTask", newTask);
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (err) {
        res.status(400).json({ message: "Failed to create task", details: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ message: "Failed to get tasks", details: err.message });
    }
}

exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ task });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get task", details: err.message });
    }
}
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, assignedTo } = req.body;

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        await task.update({ title, description, status, assignedTo });
        const io = getSocketIo();

        io.emit("updateTask", task);
        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ error: "Failed to update task", details: error.message });
    }
};
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        await task.destroy();
        const io = getSocketIo();

        io.emit("taskDeleted", id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task", details: error.message });
    }
};