//Imports
const { user } = require("../models");
const db = require("../models");
require("dotenv").config();
const User = db.user;
const Role = db.role;
const Order = db.order;
const Inventory = db.inventory;
const Route = db.route;

const Op = db.Sequelize.Op;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

//////////////////////////////////////////
//User Functions
exports.userBoard = (req, res) => {
  res.status(200).send({
    message: "User Content.",
    id: req.userId});
};

//User - Place Order
exports.makeRequest = (req, res, next) => {
  var body ;
    User.findByPk(req.userId
      ,{
      attributes: ['id','first_name','last_name','location']
    }

    )
    .then(user => {
      var params;
      if (req.body.type == 'Request') {
        params = {
          type: req.body.type,
          location: user.location,
          bin_size: 'N/A',
          bin_colour: 'N/A',
          label: 'N/A',
          payment_method: 'Cash',
          payment_received: 'Yes',
          cost: 25.00,
          status: 'Pending',
        }
      }
      if (req.body.type == 'Purchase') {
        params = {
          type: req.body.type,
          location: user.location,
          bin_size: req.body.bin_size,
          bin_colour: req.body.bin_colour,
          label: req.body.label,
          payment_method: req.body.payment_method,
          payment_received: req.body.payment_received,
          cost: req.body.cost,
          status: 'Pending',
        }
      }
      const newOrder = user.createOrder(params);
      body = user.first_name + ' ' + user.last_name;
      return newOrder;
    })
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: "Operation Unsuccessful, Please Try Again Later",
        });
      }

      if (req.body.type == 'Purchase')
      {Inventory.findOne({
        where: {
          bin_size: req.body.bin_size,
          bin_colour: req.body.bin_colour
        }
      }).then(item =>{item.decrement('number')});
      }

      return res.status(200).send({
        message: "Your Request has been received Successfully.",
        order_no: order.order_no,
        user: body
      })
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
  // next();
}

// User Get All Receipts
exports.getReceipts = (req, res) => {
  Order.findAll(
    { where: {
      user_id: req.userId,
      status : req.body.status
    } }
  )
    .then(order => {
      // console.log(order)
      if (!order) {
        return res.status(404).send({
          message: "Operation Unsuccessful, Please Try Again Later",
        });
      }

      return res.status(200).send({
        message: `Returned ${order.length} orders Successfully`,
        orders: order
        // count: order.count
      })
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
}

//Get One Receipt
exports.getOneReceipt = (req, res) => {
  Order.findByPk(req.body.order_no,
    { where: {
      user_id: req.userId,
      status : req.body.status
    } }
  )
    .then(order => {
      // console.log(order)
      if (!order) {
        return res.status(404).send({
          message: "Operation Unsuccessful, Please Try Again Later",
        });
      }

      return res.status(200).send({
        message: `Returned  order Successfully`,
        orders: order
        // count: order.count
      })
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
}


////////////////////////////////////
//Admin Functions 
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.processOrder = (req, res) => {
  Order.update({
    status: req.body.status
  },{
    where: {
      order_no: req.body.order_no,
      type: req.body.type
    }
  })
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: "Operation Unsuccessful, Please Try Again Later",
        });
      }
      // Reduce Bin Number By 1
      //
      return res.status(200).send({
        message: "Order Status Changed Successfully",
        order_no: order.order_no,
      })
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
}

// Get all Orders
exports.getOrders = (req, res) => {
  Order.findAll(
    // { where: {status : req.body.status} }
  )
    .then(order => {
      // console.log(order)
      if (!order) {
        return res.status(404).send({
          message: "Operation Unsuccessful, Please Try Again Later",
        });
      }

      return res.status(200).send({
        message: `Returned ${order.length} orders Successfully`,
        orders: order
        // count: order.count
      })
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
}
//
exports.getOrder = (req, res) => {
  Order.findByPk(req.body.order_no ,{
    where: {
      status : req.body.status
    }
  })
    .then(order => {
      // console.log(order)
      if (!order) {
        return res.status(404).send({
          message: "Operation Unsuccessful, Please Try Again Later",
        });
      }

      return res.status(200).send({
        message: `Returned  Order  Successfully`,
        orders: order
      })
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
}
// Inventory 
exports.getInventory = (req,res) =>{
      Inventory.findAll()
      .then(inventory => {
        // console.log(inventory)
        if (!inventory) {
          return res.status(404).send({
            message: "Operation Unsuccessful, Please Try Again Later",
          });
        }
  
        return res.status(200).send({
          message: `Returned  inventory  Successfully`,
          inventory: inventory
        })
      })
      .catch(err => {
        return res.status(500).send({ message: err.message });
      });
}

exports.addBin = (req,res) =>{
  Inventory.update({
    number: req.body.number
  },{
    where :{
      bin_colour : req.body.bin_colour,
      bin_size: req.body.bin_size
    }
  })

  .then(inventory => {
    // console.log(inventory)
    if (!inventory) {
      return res.status(404).send({
        message: "Operation Unsuccessful, Please Try Again Later",
      });
    }

    return res.status(200).send({
      message: `Returned  inventory  Successfully`,
      inventory: inventory
    })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message });
  });
}


// Admin -  Create Route
// exports.createRoute = (req,res) => {
  
//       const params={
//         location: user.location,
//         bin_size: 'N/A',
//         bin_color: 'N/A',
//         label: 'N/A',
//         payment_method: 'Cash',
//         payment_received: 'Yes',
//         cost: 25.00,
//         status: 'Pending'

//       }
//     Route.create(params)
//     .then(order => {
//       if (!order) {
//         return res.status(404).send({
//           message: "Operation Unsuccessful, Please Try Again Later",
//         });
//       }

//       Inventory.findOne({
//         where: {
//           bin_size: req.body.bin_size,
//           bin_colour: req.body.bin_colour
//         }
//       }).then(item => { item.decrement('number') });

//       return res.status(200).send({
//         message: "Your Request has been received Successfully.",
//         order_no: order.order_no,
//         user: body
//       })
//     })
//     .catch(err => {
//       return res.status(500).send({ message: err.message });
//     });
  // next();
// }



//////////////////////////////////////
// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };

///////////////////////////////////////////////////