const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize= new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST || "localhost",
        dialect: "postgres",
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 1000,
        },
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.inventory = require("../models/inventory.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.route = require("../models/route.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});

db.user.hasMany(db.order, {
    foreignKey: 'user_id'
});
db.order.belongsTo(db.user);


db.ROLES = ["user", "admin", "moderator"];

// const Bins = ["RED","YELLOW","BLUE"];
//   const colour = ["LARGE","MEDIUM","SMALL"];
//   Bins.forEach(bin => {
//     colour.forEach(colour =>{
//       console.log(`Bin SIze : ${bin}  Bin Colour : ${colour}`);
//       db.inventory.create({
//         bin_size: bin,
//         bin_colour: colour,
//         number: 0,
//       }).then(item=>{
//         console.log(item.toJSON())})
//     });
//   }); 

module.exports = db;
