/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert([
    {
      id: 1,
      descricao: "leite em po",
      valor: 14,
      marca: "Ninho",
    },
    {
      id: 2,
      descricao: "batata doce",
      valor: 4,
      marca: "organicos",
    },
  ]);
};
