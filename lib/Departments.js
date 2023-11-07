const inquirer = require('inquirer');
const db = require('../config/connection.js');
const { reject } = require('lodash');


const getDepartments = () => {
  return ((req, res) => {
    db.query(`SELECT * FROM department`, (err, data) => {
      if (err) req({ status: "error", body: err });
      res({ status: "success", body: data });
    })
  })
}

const viewAllDepartments = () => {
  return ((req, res) => {
    db.query(`SELECT name AS department FROM department`, (err, data) => {
      if (err) req({ status: "error", body: err });
      res({ status: "success", body: data });
    })
  }
  )
}

const addDepartment = () => {
  var response = await getDepartments();
  return ((req, res) => {
    const data = (res.status === "success") ? response.body : reject(response);
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: `Enter name for the new department:`,
        validate: async (input) => {
          if (data.filter(item => item.name.toLowerCase() === input.toLowerCase()).length > 0) {
            return `The ${input} department already exists.`;
          } else {
            return (input.length > 0 && input.length <= 30) ? true : "Text length cannot be 0 or more than 30 characters";
          }
        },
      }
    ]).then((response) => {
      db.query(`INSERT INTO departments(name) VALUES (?); `, response.name, (err, data) => {
        if (err) reject({ status: "error", body: err });
        resolve({ status: "success", body: data });
      });
    });
  });
}

async function deleteDepartment() {

  var response = await getDepartments();

  return new Promise((resolve, reject) => {
    var departments = (response.status === "success") ? response.body : reject(response);


    var deptChoices = departments.map((item) => { return { value: item.id, name: item.name } });

    inquirer.prompt([
      {
        type: "list",
        name: "department_id",
        message: `Select a department to delete:`,
        choices: deptChoices,
      },

    ]).then((response) => {
      db.execute(`DELETE FROM departments WHERE id = ?;`,
        [response.department_id],
        (err, data) => {
          if (err) reject({ status: "error", body: err });
          resolve({ status: "success", body: data });
        });
    });
  });
}



module.exports = {
  getDepartments,
  viewAllDepartments,
  addDepartment,
  deleteDepartment
};