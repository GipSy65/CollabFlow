const Role = require('../models/Role');
const Permission = require('../models/Permission');

const seedRolesAndPermissions = async () => {
    try{
        const roles = ["Admin", "Project Manager", "Team Member", "Viewer"];
        for (const roleName of roles) {
            await Role.findOrCreate({
                where: { name: roleName },
            });
        }
        const permission = [

            { name: "Manage Users", action: "create" },
            { name: "Manage Users", action: "delete" },
            { name: "Manage Projects", action: "update" },
            { name: "Manage Tasks", action: "read" },

        ];
        for (const perm of permission) {
            await Permission.findOrCreate({
                where: { name: perm.name, action: perm.action },
            });
        }
        console.log("Roles and Permissions created successfully");

    }catch(err){
        console.error("Error creating Roles and Permissions", err);
    }
}

    seedRolesAndPermissions();