const { Pool } = require("pg");
const createTables = require("./schema");
const pool = new Pool({ connectionString: process.env.DB_URI });

const q = {
  createTables: async () => await pool.query(createTables),
  addStatusTypes: async () =>
    await pool.query(
      "INSERT INTO statuses (status, passcode) VALUES ('author', 'roh6'), ('member', 'reb6'), ('admin', 'nim5')"
    ),
  getAllStatusTypes: async () => await pool.query("SELECT * FROM statuses"),
  getAuthorStatusId: async () =>
    await pool.query("SELECT id FROM statuses WHERE status='author'"),
  assignUserAnAuthorStatus: async (userId, authorStatusId) =>
    await pool.query(
      `INSERT INTO user_status (user_id, status_id) VALUES (${userId}, ${authorStatusId})`
    ),
  addUserData: async (username, firstName, lastName, hashedPassword) =>
    await pool.query(
      "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id",
      [username, firstName, lastName, hashedPassword]
    ),
  getUserDataByUsername: async (username) =>
    await pool.query("SELECT * FROM users WHERE username=$1", [username]),
  getUserDataById: async (id) =>
    await pool.query(
      `SELECT user_id, status FROM users
        JOIN user_status ON users.id=user_status.user_id
        JOIN statuses ON user_status.status_id=statuses.id 
        WHERE users.id=${id}
      `
    ),
  getStatusData: async (status) =>
    await pool.query(`SELECT * FROM statuses WHERE status='${status}'`),
  changeUserStatus: async (userId, newStatusId) =>
    await pool.query(
      `UPDATE user_status SET status_id=${newStatusId} WHERE user_id=${userId}`
    ),
  addUserPost: async (title, text) =>
    await pool.query(
      "INSERT INTO posts (title, text, time) VALUES ($1, $2, $3) RETURNING id",
      [title, text, new Date()]
    ),
  creditPostToUser: async (userId, postId) =>
    await pool.query(
      `INSERT INTO user_post (user_id, post_id) VALUES (${userId}, ${postId})`
    ),
  getMessagesOnly: async () =>
    await pool.query("SELECT title, text FROM posts"),
  getMessagesAndBios: async () =>
    await pool.query(
      `SELECT first_name, last_name, status, post_id, title, text, time FROM users
        JOIN user_status ON users.id=user_status.user_id
        JOIN statuses ON user_status.status_id=statuses.id 
        JOIN user_post ON users.id=user_post.user_id
        JOIN posts ON posts.id=user_post.post_id
      `
    ),
  deletePost: async (postId) => {
    await pool.query(`DELETE FROM posts WHERE id=${postId}`);
    await pool.query(`DELETE FROM user_post WHERE post_id=${postId}`);
  },
};

module.exports = q;
