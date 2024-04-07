const start = [
    {
        type: 'list',
        message: "What would you like to do?",
        choices: ['View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add Employee', 'Update Employee Role', 'Exit'],
        name: 'choice',
    },
];

const addDepartmentPrompt = [
    {
        type: 'input',
        message: 'Enter new Department:',
        name: 'newDepartment'
    },
];

const addRolePrompt = [
    {
        type: 'input',
        message: 'Enter new Role:',
        name: 'newRole'
    },
    {
        type: 'input',
        message: 'Enter the salary for this role:',
        name: 'roleSalary'
    },
    {
        type: 'list',
        message: 'Which department will this role be included?',
        choices: [],
        name: 'roleDepartment'
    },
];

const addEmployeePrompt = [
    {
        type: 'input',
        message: 'Enter First Name:',
        name: 'employeeFirstName',
    },
    {
        type: 'input',
        message: 'Enter Last Name:',
        name: 'employeeLastName',
    },
    {
        type: 'list',
        message: 'What role will this employee have?',
        choices: [],
        name: 'employeeRole',
    },
    {
        type: 'list',
        message: `Who will be the employee's manager?`,
        choices: ['Deborah'],
        name: 'employeeManager',
    },
];

const updatedEmployeePrompt = [
    {
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: [],
        name: 'updatedEmployeeName',
        },
        {
            type: 'list',
            message: 'What role will this employee have?',
            choices: [],
            name: 'updatedEmployeeRole',
            },
]

module.exports = { start, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updatedEmployeePrompt};