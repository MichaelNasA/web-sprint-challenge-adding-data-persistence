/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("tasks", function (table) {
      table.increments("task_id").primary(); // primary key
      table.string("task_description").notNullable(); // required
      table.text("task_notes"); // optional
      table.boolean("task_completed").defaultTo(false); // defaults to false if not provided
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects"); // required and references projects table
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("tasks");
  };