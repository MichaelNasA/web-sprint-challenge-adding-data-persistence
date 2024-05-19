/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("projects", function (table) {
      table.increments("project_id").primary(); // primary key
      table.string("project_name").notNullable(); // required
      table.text("project_description"); // optional
      table.boolean("project_completed").defaultTo(false); // defaults to false if not provided
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("projects");
  };