const env = require('./env');
const path = require('path');

const settings = {
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  host: env.db.host,
  port: env.db.port,
  dialect: 'postgres',
  logging: false,

    seederStorage: 'sequelize',
    seedersPath: path.resolve(__dirname, '../seeders'),
  pool: { max: 10, min: 0, idle: 10000 },
};

module.exports = {
  development: settings,
  test: settings,
  production: settings,
};
