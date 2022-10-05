const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        order_no: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true

        },
        type:{
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.GEOGRAPHY('POINT')
        },
        createdAt: {
            type: Sequelize.DATE
        },
        bin_size: {
            type: Sequelize.STRING
        },
        bin_colour: {
            type: Sequelize.STRING
        },
        label: {
            type: Sequelize.STRING
        },
        payment_method: {
            type: Sequelize.STRING
        },
        payment_received: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.STRING
        },
    },{
        tableName : 'order'
    },
    {timestamps: false,});
  
    return Order;
  };