const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Route = sequelize.define("route", {
        route_no: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        issue_date: {
            type: Sequelize.DATEONLY
        },
        location: {
            type: Sequelize.ARRAY(Sequelize.GEOGRAPHY('POINT'))
        },
        start_date: {
            type: Sequelize.DATEONLY
        },
        start_time: {
            type: Sequelize.TIME
        },
        eta: {
            type: Sequelize.TIME
        },
        distance: {
            type: Sequelize.FLOAT
        },
        truck_id: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
    }, {
        tableName: 'route'
    },
    {timestamps: false,});

    return Route;
};