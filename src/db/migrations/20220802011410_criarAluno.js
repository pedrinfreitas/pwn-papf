/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("alunos", function (table) {
    table.increments().primary();
    table.string("nome", 200).notNullable();
    table.string("email", 200).notNullable();
    table.string("celular", 11).notNullable();
    table.integer("idade").notNullable();
    table.string("objetivo", 200).notNullable();
    table.decimal("peso").notNullable();
    table.timestamp("criado_em").defaultTo(knex.fn.now());
    table.timestamp("atualizado_em").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("alunos");
};
