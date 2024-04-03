const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(

{
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employees_db'
}
);

const inquirerPrompts = (questionArray, query, nameData, message, callback) => {
    inquirer.createPromptModule(questionArray).then((answers) => {
        db.query(query, {
            name: answers[nameData], 
        }, function (err) {
            if (err) throw err;
            console.log('${message}');
            if(callback) {
                callback();
            }
        });
    });
};

module.exports = {inquirerPrompts}