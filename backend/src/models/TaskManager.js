const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "tasks" });
  }

  findAllWithImportanceDescription() {
    return this.database.query(
      `SELECT ${this.table}.id, ${this.table}.title, ${this.table}.is_urgent, ${this.table}.importance_id, importance.title importance_title FROM ${this.table}
       INNER JOIN importance ON importance.id = ${this.table}.importance_id`
    );
  }

  insert(task) {
    return this.database.query(
      `insert into ${this.table} (title, is_urgent, importance_id) values (?,?,?)`,
      [task.title, task.is_urgent, parseInt(task.importance_id, 10)]
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
