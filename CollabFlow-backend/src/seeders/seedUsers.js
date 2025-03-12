const bcrypt = require("bcryptjs");
const db = require('../models/index')

const user = db.User;
async function seedUsers() {
    try {
        await db.sequelize.sync();
        const hashedPassword = await bcrypt.hash("password123", 12);

        await user.bulkCreate([
            {
                name: "Admin User",
                email: "tripathyashutosh@g65mail.com",
                password: hashedPassword,
                role: "admin"
            },
            {
                name: "Manager User",
                email: "tripathyashutosh33@gmail.com",
                password: hashedPassword,
                role: "manager"
            },
            {
                name: "Regular User",
                email: "abc@gmail.com",
                password: hashedPassword,
                role: "user"
            }
        ]);

        console.log("Test users created successfully!");
        process.exit();
    } catch (err) {
        console.error("Error seeding users:", err);
        process.exit(1);
    }
}

seedUsers();
