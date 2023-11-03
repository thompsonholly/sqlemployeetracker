const inquirer = require('inquirer');
require('dotenv').config()

const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: process.env.DB_PW,
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

const viewDepartment = () => {
  db.query('SELECT * FROM department', (err, res) => {
    console.table(res)
  })
};
const viewRole = () => {
  db.query('SELECT * FROM role', (err, res) => {
    console.table(res)
  })
};

const viewAllEmployee = () => {
  db.query('SELECT * FROM employee', (err, res) => {
    console.table(res)
  })
};



const init = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Pick an option.',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
  ])
    .then((answer) => {
      if (answer.option === 'view all departments') {
        viewDepartment();
        viewRole();
        viewAllEmployee();
      }
    })
};


init();





