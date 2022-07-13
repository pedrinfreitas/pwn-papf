require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: process.env.ENV_TYPE,
    connection: {
      host: process.env.ENV_HOST,
      port: process.env.ENV_PORT,
      user: process.env.ENV_USERNAME,
      password: process.env.ENV_PASSWORD,
      database: process.env.ENV_DATABASE,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  production: {
    client: process.env.ENV_TYPE,
    connection: {
      host: process.env.ENV_HOST,
      port: process.env.ENV_PORT,
      user: process.env.ENV_USERNAME,
      password: process.env.ENV_PASSWORD,
      database: process.env.ENV_DATABASE,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },
};
