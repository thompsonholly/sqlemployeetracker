

class Collection {
  constructor(name, table, columns) {
    this.name = name;
    this.table = table;
    this.columns - columns;
    this.rows = rows;
  }
  getAll() {
    db.query(`SELECT * FROM ${this.table}`)
  }
  getOne(id) {
    db.query(`SELECT * FROM ${this.table} WHERE id = ${id}`)
  }
  addOne(data) {
    db.query(`INSERT INTO ${this.table}`)
  }
}
const employees = new Collection("employees", ["id", "name", "role", "department", "manager"])

// employees managers role department