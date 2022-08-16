/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("usuarios").del();
  await knex("usuarios").insert([
    {
      nome: "teste USER",
      email: "user@gmail.com",
      login: "user",
      senha: "123456",
      roles: "USER",
    },
    {
      nome: "teste ADMIN",
      email: "admin@gmail.com",
      login: "admin",
      senha: "123456",
      roles: "ADMIN",
    },
  ]);
};
