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
let ArrayAllEmp = [];
let ArrayEmployees = []
let ArrayRoles = [];
let ArrayManagers = [];

// initiate() function triggers prompts for user input
const initiate = () => {
  // insert user inputs to open arrays above.
  insertAllEmployees();
  insertEmployees();
  insertRoles();
  insertManagers();
  insertDepartments();
  // call inquirer prompts
  inquirer
    .prompt({
      name: "start",
      message: "Please select the following tables in the employee_managementDB database you would like to manage.",
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
          return console.log("Please type 'ctrl' + 'z'"
          );
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
    initiate();
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
  var AllEmployees = ArrayManagers.concat(ArrayEmployees);
  console.log(AllEmployees);
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "name",
          message: "Which Department would you like to delete?",
          choices: AllEmployees,
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

// Employee functions
const insertEmployees = () => {
  connection.query(
    "SELECT first_name, last_name, id FROM employee WHERE manager_id IS NOT NULL",
    (err, res) => {
      if (err) throw err;
      res.forEach((employee) => {
        ArrayEmployees.push({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        });
      });
    }
  );
};

const DisplayEmployees = () => {
  connection.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.log(`\nAll Employees:\n`);
    console.table(res);
    initiate();
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstname",
        message: "Please provide the First Name of the New Employee.",
        type: "input",
      },
      {
        name: "lastname",
        message: "Please provide the Last Name of the New Employee",
        type: "input",
      },
      {
        name: "role",
        message: "Please choose the New Employee's role.",
        choices: ArrayRoles,
        type: "list",
      },
      {
        name: "managerDesignation",
        message:
          "Please provide the new employee's manager. If not not applicable, then please leave the form blank.",
        choices: ArrayManagers,
        type: "list",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
        [
          res.firstname,
          res.lastname,
          ArrayRoles.indexOf(res.role) + 1,
          ArrayManagers.indexOf(res.managerDesignation) + 1,
        ],
        (err, res) => {
          if (err) throw err;
          console.log(`\nNew Employee added!\n`);
          initiate();
        }
      );
    });
};

const insertAllEmployees = () => {
  connection.query(
    "SELECT first_name, last_name FROM employee",
    (err, res) => {
      if (err) throw err;
      res.forEach((employee) => {
        ArrayAllEmp.push({
          name: employee.last_name,
        })
      }); 
    });    
};

const deleteEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "EmployeeForDelete",
          message: "Please select the employee you want to delete.",
          choices: ArrayAllEmp,
          type: "list",
        },
      ])
      .then((res) => {
        connection.query(
          "DELETE FROM employee WHERE ? ",
          {
            last_name: res.EmployeeForDelete,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`Employee has been deleted.`);
            initiate();
          }
        );
      });
  });
};

const insertManagers = () => {
  connection.query(
    "SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL",
    (err, res) => {
      if (err) throw err;
      res.forEach((manager) => {
        ArrayManagers.push({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        });
      });
    }
  );
};


const DisplayEmpByManager = () => {
  insertManagers();
  inquirer
    .prompt([
      {
        name: "ChosenManager",
        message: "Select the manager.",
        choices: ArrayManagers,
        type: "list",
      },
    ])
    .then((res) => {
      connection.query(
        "SELECT employee.first_name, employee.last_name FROM employee WHERE manager_id=? ",
        [res.ChosenManager],
        (err, res) => {
          if (err) throw err;
          console.log(`\nEmployees Displayed are Managed By ${res.ChosenManager}:\n`);
          console.table(res);
          initiate();
        }
      );
    });
};

const DisplayEmpByRole = () => {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    (err, res) => {
      if (err) throw err;
      console.log(`\nEmployees Displayed by Role:\n`);
      console.table(res);
      initiate();
    }
  );
};

const editEmployee = () => {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "EditEmployee",
            message: "Select the employee account that you would like to edit.",
            choices: ArrayEmployees,
            type: "list",
          },
          {
            name: "EditRole",
            message: "Select the role for the employee.",
            choices: function () {
              for (var i = 0; i < res.length; i++) {
                roleArr.push(res[i].Title);
              }
              return ArrayRoles;
            },
            type: "rawlist",
          },
        ])
        .then((val) => {
          connection.query(
            `UPDATE employee 
            SET role_id = (SELECT id FROM role WHERE title=? )
            WHERE last_name=?`,
            [val.EditRole, val.EditEmployee],
            (err, res) => {
              if (err) throw err;
              console.log(`\nEdits Incorporated\n`);
              initiate();
            }
          );
        });
    }
  );
};

// Role functions
const insertRoles = () => {
  connection.query("SELECT * FROM role;", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      ArrayRoles.push(res[i].title);
    }
  });
};

const DisplayRoles = () => {
  connection.query("SELECT * FROM role;", (err, res) => {
    if (err) throw err;
    console.log(`\nRoles:\n`);
    console.table(res);
    initiate();
  });
};

const addRoles = () => {
  inquirer
    .prompt([
      {
        name: "NewRoleTitle",
        message: "Please input the new job title you are adding to roles.",
        type: "input",
      },
      {
        name: "NewRoleSalary",
        message: "Please input the new role's salary.",
        type: "input",
      },
      {
        name: "NewRoleDepartment",
        message: "Please select the new role's Department.",
        choices: ArrayDepartments,
        type: "list",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO role SET ? ",
        {
          title: res.NewRoleTitle,
          salary: res.NewRoleSalary,
          department_id: res.NewRoleDepartment,
        },
        (err) => {
          if (err) throw err;
          console.log(`\nYou have added the New Role to \n`);
          console.table(res);
          initiate();
        }
      );
    });
};

const deleteRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "RoleForDelete",
          message: "Please select the role you want to delete.",
          choices: function () {
            let ArrayRoles = [];
            for (var i = 0; i < res.length; i++) {
              ArrayRoles.push(res[i].RoleForDelete);
            }
            return ArrayRoles;
          },
          type: "list",
        },
      ])
      .then((res) => {
        connection.query(
          "DELETE FROM role WHERE ? ",
          {
            name: res.RoleForDelete,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.RoleForDelete} has been deleted.`);
            initiate();
          }
        );
      });
  });
};


