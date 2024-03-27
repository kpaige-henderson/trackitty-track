const inquirer = require('inquirer');
const mysql = require('mysql2');
const { start, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updatedEmployeePrompt } = require('./arrays')
const { inquirerPrompts } = require('/functions')

const db = mysql.createConnection(

    {
        //input
    }
    );


//add code for prompts and main menu






















// async function mainMenu() {
//     const { choice } = await inquirer.prompt({
//         type: 'list',
//         name: 'choice',
//         message: 'What would you like to do?',
//         choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
//     });

//     switch (choice) {
//         case 'View all departments':
//             await viewDepartments();
//             break;
//         case 'Add a department':
//             await addDepartment();
//             break;
//         case 'View all roles':
//             await viewRoles();
//             break;
//         case 'Add a role':
//             await addRole();
//             break;
//         case 'View all employees':
//             await viewEmployees();
//             break;
//         case 'Add an Employee':
//             await addEmployee();
//             break;
//         case 'Update an employee role':
//             await updateRole;
//             break;
//         case 'Exit':
//             console.log('Goodbye');
//             return;
//     }

// }
// mainMenu();
