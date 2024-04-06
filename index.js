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
                viewDatabase("SELECT * FROM role");
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Employees':
                viewDatabase("SELECT * FROM employee");
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
    runInquirer(addDepartmentPrompt, "INSERT INTO department SET ?", "departmentName", "Department added", init);
};

const addRoll = () => {
    db.query("SELECT id, name FROM department", function (err, results) {
        if (err) throw err;

        const existingDepartments = results.map(department => ({
            value: department.id,
            name: department.name
        }));

        const roleDepartmentQuestion = addRolePrompt.find(question => question.name === 'roleDepartment');

        if (roleDepartmentQuestion && roleDepartmentQuestion.type === 'list') {
            roleDepartmentQuestion.choices = existingDepartments;
        } else {
            console.error("Error. Updating choices for role department failed");
        };

        inquirer.prompt(addRolePrompt).then((answers) => {
            db.query("INSERT INTO role SET ?", {
                title: answers.roleTitle,
                salary: answers.roleSalary,
                department_id: answers.roleDepartment
            }, function (err) {
                if (err) throw err;
                console.log("Role Added");
                init();
            });
        });
    });
};

const addEmployee = () => {
    db.query("SELECT id, title FROM role", function (err, results) {
        if (err) throw err;
        const existingRoles = results.map(role => ({
            value: role.id,
            name: role.title
        }));

        const employeeRoleQuestion = addEmployeePrompt.find(question => question.name === 'employeeRole');

        if (employeeRoleQuestion && employeeRoleQuestion.type === 'list') {
            employeeRoleQuestion.choices = existingRoles;
        } else {
            console.error("Error. Updating choices for employee role failed");
        };

        db.query("SELECT id, first_name, last_name FROM employee", function (err, results) {
            if (err) throw err;

            const existingEmployees = results.map(employee => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));

            const employeeManagerQuestion = addEmployeePrompt.find(question => question.name === 'employeeManager');

            if (employeeManagerQuestion && employeeManagerQuestion.type === 'list') {
                employeeManagerQuestion.choices = existingEmployees;
            } else {
                console.error("Error. Updating choices for manager failed");
            }

            inquirer.prompt(addEmployeePrompt).then((answers) => {
                db.query("INSERT INTO employee SET ?", {
                    first_name: answers.employeeFirst,
                    last_name: answers.employeeLast,
                    role_id: answers.employeeRole,
                    manager_id: answers.employeeManager
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
    db.query("SELECT id, first_name, last_name FROM employee", function (err, results) {
        if (err) throw err;
        const existingEmployees = results.map(employee => ({
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`
        }));

        const updatedEmployeeQuestion = updatedEmployeePrompt.find(question => question.name === 'updatedEmployeeName');

        if (updatedEmployeeQuestion && updatedEmployeeQuestion.type === 'list') {
            updatedEmployeeQuestion.choices = existingEmployees;
        } else {
            console.error("Error. Can not display employees");
        };

        db.query("SELECT id, title FROM role", function (err, results) {
            if (err) throw err;
            const existingRoles = results.map(role => ({
                value: role.id,
                name: role.title
            }));


            const updatedRolesQuestion = updatedEmployeePrompt.find(question => question.name === 'updatedEmployeeRole');

            if (updatedRolesQuestion && updatedRolesQuestion.type === 'list') {
                updatedRolesQuestion.choices = existingRoles;
            } else {
                console.error("Error. Updating choices for employee role failed");
            }

            inquirer.prompt(updatedEmployeePrompt).then((answers) => {
                console.log(answers);
                db.query("UPDATE employee SET role_id = ? WHERE id = ?", 
                    [
                        answers.updatedEmployeeRole,
                        answers.updatedEmployeeQuestion
                    ], function(err) {
                        if (err) throw err;
                        console.log("Employee updated successfully!");
                        init();
                    });
            });
        });
    });
};




















