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
  init();
};
const viewRole = () => {
  db.query('SELECT * FROM role', (err, res) => {
    console.table(res)
  })
  init();
};

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', (err, res) => {
    console.table(res)
  })
  init();
};

// Bonus 
const viewAllManagers = () => {
  db.query('SELECT manager_id FROM employee', (err, res) => {
    console.table(res)
  })
  init();
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
      name: 'title',
      message: 'Please provide new title for a role.'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Please enter in a salary for the new role.'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Please enter a new department ID for new role.'
    }
  ])
    .then((answer) => {
      const sql = `INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)`;
      console.log("yes");
      const params = [answer.title, answer.salary, answer.department_id];

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
      name: 'first_name',
      message: 'Please provide new employee first name.'
    },

    {
      type: 'input',
      name: 'last_name',
      message: 'Please provide new employee last name.'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Please provide new employee ID.'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Please provide a manager id if applicable.'
    },

  ])
    .then((answer) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?) `;
      const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

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
      const params = [answer.employee_id, answer.new_role];
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
      name: 'employee_id',
      message: 'Please enter employee ID that you wish to update.'
    },
    {
      type: 'input',
      name: 'new_manager',
      message: 'Please enter new manager ID for employee.'
    }
  ])
    .then((answer) => {
      const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
      const params = [answer.employee_id, answer.new_manager];
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
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee manager', 'View all managers', 'Update an employee role']
    }
  ])
    .then((answer) => {
      console.log(answer)
      if (answer.option === 'View all departments') {

        viewDepartment();

      }
      else if (answer.option === 'View all roles') {
        viewRole();
      }
      else if (answer.option === 'View all employees') {

        viewAllEmployees();
      }
      else if (answer.option === 'Add a department') {

        addDepartment();
      }
      else if (answer.option === 'Add a role') {

        addRole();
      }
      else if (answer.option === 'Add an employee') {

        addEmployee();
      }
      // Bonus
      else if (answer.option === 'Update an employee manager') {
        updateEmployeeManager();
      }
      // Bonus
      else if (answer.option === 'View all managers') {
        viewAllManagers();
      }
      else {
        updateEmployee();
      }

    })

};


init();





