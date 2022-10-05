const Sequelize = require('sequelize');
require('dotenv')


module.exports = new Sequelize('database', 'username', 'password', {
    host: process.env.HOST || 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    },
    
  });

 