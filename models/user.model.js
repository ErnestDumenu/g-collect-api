module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING(60)
        },
        last_name: {
            type: Sequelize.STRING(60)
        },
        dob: {
            type: Sequelize.DATEONLY
        },
        sex: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        contact: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.GEOGRAPHY('POINT')
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'user',
        timestamps: false
    }
    
    );

    return User;
};