const { Sequelize, DataTypes } = require("sequelize");
const dbconfig = require("../../Config/db-config");
const mysql = require("mysql2/promise");

mysql
  .createConnection({
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    host: dbconfig.HOST,
  })
  .then((Connection) =>
    Connection.query(`create database if not exists ${dbconfig.DATABASE}`)
  );

const sequelize = new Sequelize(
  dbconfig.DATABASE,
  dbconfig.USER,
  dbconfig.PASSWORD,
  {
    host: dbconfig.HOST,
    dialect: dbconfig.DIALECT,
  }
);

const db = {};
db.sequelize = sequelize;
db.User = require("./User")(sequelize, DataTypes);
db.profile = require("./profile")(sequelize, DataTypes);

db.sequelize.sync({ force: false }, () => {
  console.log("Sync done");
});

module.exports = db;
