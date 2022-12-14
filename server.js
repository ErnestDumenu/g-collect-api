const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8081","http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/home", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// routes
require('./routes/auth.routes')(app);

require('./routes/user.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

////////////////////////////////////////////////////////////////
const db = require("./models");
db.sequelize.sync().then(()=>{
  console.log('Database Ready')
});

//////////////////////////////////////////////////////////////
// //CREATE Entries in Roles Table. Use only for initial runninng
// const Role = db.role;
// const Order= db.order;
// Order.drop();
// db.sequelize.sync({alter: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });




function initial() {
  Role.create({
    id: 1,
    name: "user"
  },
  // {
  //   silent : true }
  );
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  }); 
}
 ///////////////////////////////////////////////