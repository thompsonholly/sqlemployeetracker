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

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', (err, res) => {
    console.table(res)
  })
};
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'add_department',
      message: 'Please provide new department name.'
    }
  ])
    .then((answer) => {
      const sql = `INSERT INTO department (department_name)
      VALUES (?)`;
      const params = [answer.add_department];

      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err)
        }
        console.table(res)
      });

    })

};

const updateEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Please enter employee ID that you wish to update.'
    },
    {
      type: 'input',
      name: 'new_role',
      message: 'Please enter new role ID for employee.'
    }
  ])
    .then((answer) => {
      const sql = `UPDATE `
    })
}



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

        // viewAllEmployees();
      }
      else if (answer.option === 'view all roles') {
        viewRole();
      }
      else if (answer.option === 'view all employees') {

        viewAllEmployees();
      }
      else if (answer.option === 'add a department') {

        addDepartment();
      }
      else {
        updateEmployee();
      }

    })








};


init();





