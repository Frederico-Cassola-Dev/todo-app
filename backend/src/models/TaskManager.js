const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "tasks" });
  }

  insert(task) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      task.title,
    ]);
  }

  update(task) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [task.title, task.id]
    );
  }
}

module.exports = TaskManager;
