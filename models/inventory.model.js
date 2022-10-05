
module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventory", {
        bin_size: {
            type: Sequelize.STRING,
          },
        bin_colour: {
            type: Sequelize.STRING,
          },
        number: {
            type: Sequelize.INTEGER,
          },
    },{
        tableName : 'inventory'
    });
  
    return Inventory;
  };