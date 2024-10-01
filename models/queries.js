const { Pool } = require("pg");
const createTables = require("./schema");
const pool = new Pool({ connectionString: process.env.DB_URI });

const q = {
  createTables: async () => await pool.query(createTables),
  addStatusTypes: async () =>
    await pool.query(
      "INSERT INTO statuses (name) VALUES ('author'), ('member'), ('admin')"
    ),
  getAllStatusTypes: async () => await pool.query("SELECT * FROM statuses"),
  getAuthorStatusId: async () =>
    await pool.query("SELECT id FROM statuses WHERE name='author'"),
  assignUserAnAuthorStatus: async (userId, authorStatusId) =>
    await pool.query(
      `INSERT INTO user_status (user_id, status_id) VALUES (${userId}, ${authorStatusId})`
    ),
  addUserData: async (username, firstName, lastName, hashedPassword) =>
    await pool.query(
      "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id",
      [username, firstName, lastName, hashedPassword]
    ),
};

module.exports = q;
