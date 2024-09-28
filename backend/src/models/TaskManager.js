const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "tasks" });
  }

  findAllWithImportanceDescription() {
    return this.database.query(
      `SELECT ${this.table}.id, ${this.table}.title, ${this.table}.description, ${this.table}.created_at, ${this.table}.end_date, ${this.table}.is_urgent, ${this.table}.importance_id, importance.title importance_title, ${this.table}.image_url FROM ${this.table}
       INNER JOIN importance ON importance.id = ${this.table}.importance_id`
    );
  }

  insert(task) {
    return this.database.query(
      `insert into ${this.table} (title, description, created_at, is_urgent, importance_id, image_url) values (?, ?, ?, ?, ?, ?)`,
      [
        task.title,
        task.description,
        null,
        task.is_urgent,
        parseInt(task.importance_id, 10),
        task.image_url,
      ]
    );
  }

  update(task) {
    return this.database.query(
      `update ${this.table} set title = ?, is_urgent = ?, importance_id = ? where id = ?`,
      [task.title, task.is_urgent, parseInt(task.importance_id, 10), task.id]
    );
  }
}

module.exports = TaskManager;
