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

// Bonus 
const viewAllManagers = () => {
  db.query('SELECT manager_id FROM employee', (err, res) => {
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
      const sql = `INSERT INTO department (name)
      VALUES (?)`;
      const params = [answer.add_department];

      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err)
        }
        console.table(res)
        init();
      });

    })

};

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'add_role',
      message: 'Please provide new role name.'
    }
  ])
    .then((answer) => {
      const sql = `INSERT INTO role (name)
      VALUES (?)`;
      const params = [answer.add_role];

      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err)
        }
        console.table(res)
        init();
      });

    })

};

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'add_employee',
      message: 'Please provide new employee name.'
    }
  ])
    .then((answer) => {
      const sql = `INSERT INTO employee (name)
      VALUES (?)`;
      const params = [answer.add_employee];

      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err)
        }
        console.table(res)
        init();
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
      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [answer.new_role, answer.employee_id];
      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err)
        }
        console.table(res)
        init();
      });
    })
}

// Bonus
const updateEmployeeManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'manager_id',
      message: 'Please enter manager ID that you wish to update.'
    },
    {
      type: 'input',
      name: 'new_manager',
      message: 'Please enter new manager ID for employee.'
    }
  ])
    .then((answer) => {
      const sql = `UPDATE employee SET manager_id = ? WHERE manager_id = ?`;
      const params = [answer.new_manager, answer.employee_id.manager_id];
      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err)
        }
        console.table(res)
        init();
      })
    })
}





const init = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Pick an option.',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee manager', 'View all Managers', 'Update an employee role']
    }
  ])
    .then((answer) => {
      if (answer.option === 'view all departments') {

        viewDepartment();

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
      else if (answer.option === 'add a role') {

        addRole();
      }
      else if (answer.option === 'add an employee') {

        addEmployee();
      }
      // Bonus
      else if (answer.option === 'update an employee manager') {
        updateEmployeeManager();
      }
      // Bonus
      else if (answer.option === 'view all managers') {
        viewAllManagers();
      }
      else {
        updateEmployee();
      }

    })








};


init();





