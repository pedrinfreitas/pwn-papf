/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("alunos").del();
  await knex("alunos").insert([
    {
      nome: "Pedro Antonio",
      email: "pedrinfreitas@gmail.com",
      celular: "24999998129",
      idade: 33,
      objetivo: "hipertrofia",
      peso: 80,
    },
    {
      nome: "Antonio Paulo",
      email: "antoniop@gmail.com",
      celular: "24999998128",
      idade: 23,
      objetivo: "emagrecimento",
      peso: 120,
    },
  ]);
};
