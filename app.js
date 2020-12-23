const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "BradleyMySQL",
  database: "employee_managementDB",
});

connection.connect(function (err) {
  if (err) throw err;
  initiate();
});

// open arrays used to hold database values given the user choices.

let ArrayDepartments = [];
let ArrayEmployees = []
let ArrayRoles = [];
let ArrayManagers = [];

// initiate() function triggers prompts for user input
const initiate = () => {
  // insert user inputs to open arrays above.
  insertEmployees();
  insertRoles();
  insertManagers();
  insertDepartments();
  // call inquirer prompts
  inquirer
    .prompt({
      name: "start",
      message: "Please select the following tables in the employe_managementDB database you would like to manage.",
      choices: [
        "Departments",
        "Employees",
        "Roles",
        "No need to manage.",
      ],
      type: "rawlist",
    })
    // User chooses Departments
    .then((answer) => {
      switch (answer.start) {
        case "Departments":
          return inquirer
            .prompt({
              name: "DeptChoice",
              message: "What aspect of Departments would you like to manage?",
              choices: [
                "Display All Departments",
                "Add New Department to employee_managementDB",
                "Delete Department from employee_managementDB",
                "Back to Start",
              ],
              type: "rawlist",
            })
            .then((answer) => {
              switch (answer.DeptChoice) {
                case "Display All Departments":
                  DeptDisplay();
                  break;

                case "Add New Department to employee_managementDB":
                  DeptAdd();
                  break;

                case "Delete Department from employee_managementDB":
                  DeptDelete();
                  break;
                case "Back to Start":
                  initiate();
                  break;
              }
            });
        // User chooses Employees
        case "Employees":
          return inquirer
            .prompt({
              name: "EmployeeChoice",
              message: "What aspect of Employees would you like to manage?",
              choices: [
                "Display All Employees",
                "Display All Employees filtered by Manager",
                "Display All Employees filtered by Role",
                "Add Employee",
                "Delete Employee",
                "Edit Current Employee Info",
                "Back to Start",
              ],
              type: "rawlist",
            })
            .then((answer) => {
              switch (answer.EmployeeChoice) {
                case "Display All Employees":
                  DisplayEmployees();
                  break;

                case "Display All Employees filtered by Manager":
                  DisplayEmpByManager();
                  break;

                case "Display All Employees filtered by Role":
                  DisplayEmpByRole();
                  break;

                case "Add Employee":
                  addEmployee();
                  break;

                case "Delete Employee":
                  deleteEmployee();
                  break;

                case "Edit Current Employee Info":
                  editEmployee();
                  break;

                case "Back to Start":
                  initiate();
                  break;
              }
            });
          
        // User chooses Roles
        case "Roles":
          return inquirer
            .prompt({
              name: "RolesChoice",
              message: "What aspect of Roles would you like to manage?",
              choices: [
                "Display All Roles",
                "Add Role",
                "Delete Role",
                "Back to Start",
              ],
              type: "rawlist",
            })
            .then((answer) => {
              switch (answer.role_options) {
                case "Display All Roles":
                  DisplayRoles();
                  break;

                case "Add a role":
                  addRoles();
                  break;
                
                case "Add a role":
                  deleteRoles();
                  break;

                case "Back to Start":
                  initiate();
                  break;
              }
            });
        case "No need to manage.":
          return;
      }
    });
};

// Functions to manage tables from user inputs.
// Department functions

const insertDepartments = () => {
  connection.query(
    "SELECT * FROM department",
    (err, res) => {
      if (err) throw err;
      res.forEach((department) => {
        ArrayDepartments.push({
          name: `${department.name}`,
          value: department.id,
        });
      });
    }
  );
};

const DeptDisplay = () => {
  connection.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.log(`\nAll Departments in employee_managementDB:\n`);
    console.table(res);
    runApp();
  });
};

const DeptAdd = () => {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Please provide a name for the new Department you are creating.",
        type: "input",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        (err) => {
          if (err) throw err;
          console.table(res);
          console.log(`\nDepartment added!\n`);
          initiate();
        }
      );
    });
};

const DeptDelete = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "name",
          message: "Which Department would you like to delete?",
          choices: ArrayDepartments,
          type: "list",
        },
      ])
      .then((res) => {
        connection.query(
          "DELETE FROM department WHERE ? ",
          {
            name: res.name,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`\nThe chosen department has been deleted.\n`);
            initiate();
          }
        );
      });
  });
};




