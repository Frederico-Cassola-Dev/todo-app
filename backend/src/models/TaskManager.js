const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "tasks" });
  }

  insert(task) {
    return this.database.query(
      `insert into ${this.table} (title, is_urgent, importance_id) values (?,?,?)`,
      [task.title, task.is_urgent, parseInt(task.importance_id, 10)]
    );
  }

  update(task) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [task.title, task.id]
    );
  }
}

module.exports = TaskManager;
