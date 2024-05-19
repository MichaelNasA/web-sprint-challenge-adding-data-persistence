/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("resources", function (table) {
      table.increments("resource_id").primary(); // primary key
      table.string("resource_name").notNullable().unique(); // required and unique
      table.text("resource_description"); // optional
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("resources");
  };