exports.up = function(knex) {
    return knex.schema
      .createTable('projects', table => {
        table.increments('project_id'); // Primary key
        table.string('project_name').notNullable(); // Required
        table.string('project_description'); // Optional
        table.boolean('project_completed').defaultTo(false); // Defaults to false (0)
      })
      .createTable('resources', table => {
        table.increments('resource_id'); // Primary key
        table.string('resource_name').notNullable().unique(); // Required and unique
        table.string('resource_description'); // Optional
      })
      .createTable('tasks', table => {
        table.increments('task_id'); // Primary key
        table.string('task_description').notNullable(); // Required
        table.string('task_notes'); // Optional
        table.boolean('task_completed').defaultTo(false); // Defaults to false (0)
        table.integer('project_id').unsigned().notNullable()
          .references('project_id').inTable('projects')
          .onDelete('CASCADE').onUpdate('CASCADE'); // Foreign key
      })
      .createTable('project_resources', table => {
        table.increments('id'); // Primary key
        table.integer('project_id').unsigned().notNullable()
          .references('project_id').inTable('projects')
          .onDelete('CASCADE').onUpdate('CASCADE'); // Foreign key
        table.integer('resource_id').unsigned().notNullable()
          .references('resource_id').inTable('resources')
          .onDelete('CASCADE').onUpdate('CASCADE'); // Foreign key
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };