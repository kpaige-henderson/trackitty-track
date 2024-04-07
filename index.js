const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const { start, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updatedEmployeePrompt } = require ('./arrays');
const runInquirer = require ('./functions');


const db = mysql.createConnection(

    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
);

//main menu for application
const init = () => {
    inquirer.prompt(start)
    .then(({ choice }) => {
        switch (choice) {
            case 'View All Departments':
                viewDatabase("SELECT * FROM departments");
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View All Roles':
                viewDatabase("SELECT * FROM roles");
                break;
            case 'Add Role':
                addRoll();
                break;
            case 'View All Employees':
                viewDatabase("SELECT * FROM employees");
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'Exit':
                console.log('Use Control + C to quit application and exit');
                break;
            default:
                console.log('Invalid choice');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        console.log('Try Again! Something went wrong.');
        init();
    });
};


init();

const viewDatabase = (query) => {
    db.connect(function (err) {
        if (err) throw err;
        db.query(query, function (err, results) {
            if (err) throw err;
            console.table(results);
            init();
        });
    });
};

const addDepartment = () => {
    runInquirer(addDepartmentPrompt, "INSERT INTO departments SET ?", "newDepartment", "Department added", init);
};

const addRoll = () => {
    db.query("SELECT id, name FROM departments", function (err, results) {
        if (err) throw err;

        const existingDepartments = results.map(department => ({
            value: department.id,
            name: department.name
        }));
        const updatedAddRolePrompt = addRolePrompt.map(question => {
            if (question.name === "roleDepartment") {
                question.choices = existingDepartments.map(department => department.name);
            }
            return question
        })
        
        inquirer.prompt(updatedAddRolePrompt).then((answers) => {
            const chosenDepartment = existingDepartments.find(department => department.name === answers.roleDepartment);
            db.query(`INSERT INTO roles SET ?`, {
                title: answers.newRole,
                salary: answers.roleSalary,
                department_id: chosenDepartment.value
            }, function (err) {
                if (err) throw err;
                console.log("Role Added");
                init();
            });
        });
    });
};

const addEmployee = () => {
    db.query("SELECT id, title FROM roles", function (err, results) {
        if (err) throw err;

        const existingRoles = results.map(role => ({
            value: role.id,
            name: role.title
        }));

        let updatedAddEmployeePrompt = addEmployeePrompt.map(question => {
            if (question.name === "employeeRole") {
                question.choices = existingRoles.map(role => role.name);
            }
            return question
        })

        db.query("SELECT id, first_name, last_name FROM employees", function (err, results) {
            if (err) throw err;

            const existingEmployees = results.map(employee => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));

            updatedAddEmployeePrompt = updatedAddEmployeePrompt.map(question => {
                if (question.name === "employeeManager") {
                    question.choices = existingEmployees.map(employee => employee.name);
                }
                return question
            })

            inquirer.prompt(updatedAddEmployeePrompt).then((answers) => {
                const chosenRole = existingRoles.find(role => role.name === answers.employeeRole);
                const chosenManager = existingEmployees.find(employee => employee.name === answers.employeeManager);
                db.query(`INSERT INTO employees SET ?`, {
                    first_name: answers.employeeFirstName,
                    last_name: answers.employeeLastName,
                    role_id: chosenRole.value,
                    manager_id: chosenManager ? chosenManager.value : null
                }, function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    init();
                });
            });
        });
    });
};


const updateEmployee = () => {
    db.query("SELECT id, first_name, last_name FROM employees", function (err, results) {
        if (err) throw err;
        const existingEmployees = results.map(employee => ({
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`
        }));
        console.log(results)
        let employeeUpdate = updatedEmployeePrompt.map(question => {
            if (question.name === "updatedEmployeeName") {
                question.choices = existingEmployees.map(employee => employee.name);
            }
            return question
        })

        db.query("SELECT id, title FROM roles", function (err, results) {
            if (err) throw err;
            const existingRoles = results.map(role => ({
                value: role.id,
                name: role.title
            }));

            employeeUpdate = employeeUpdate.map(question => {
                if (question.name === "updatedEmployeeRole") {
                    question.choices = existingRoles.map(role => role.name);
                }
                return question
            })

            inquirer.prompt(employeeUpdate).then((answers) => {
                console.log(answers, existingEmployees)
               const chosenEmployee = existingEmployees.find(employee => employee.name === answers.updatedEmployeeName);
               const chosenRole = existingRoles.find(role => role.name === answers.updatedEmployeeRole);
                db.query("UPDATE employees SET role_id = ? WHERE id = ?", 
                    [
                        chosenRole.value,
                        chosenEmployee.value
                    ], function(err) {
                        if (err) throw err;
                        console.log("Employee updated successfully!");
                        init();
                    });
            });
        });
    });
};
