const { Pool } = require('pg');

module.exports = new Pool({
  host: 'localhost',
  User: 'starting',
  database: 'message_board',
  password: '1140067995',
  port: 5432,
});
