require("dotenv").config();
const mysql = require("mysql2");

const connectionPool = mysql.createPool(process.env.DATABASE_URL);
const connection = connectionPool.promise();

const query = async (query) => {
  return await connection.query(query);
};

module.exports = query;
