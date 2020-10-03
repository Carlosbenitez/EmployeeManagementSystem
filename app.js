const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ChloeJade419",
    database: "employee_db"
})
connection.connect(function (error) {
    if (error) throw error
    console.log("Connection ID ", connection.threadId)
    init()
})



const menuQuestion = [
    {
        type: "list",
        message: "What would like to do?",
        name: "menu",
        choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Role", "View Employee", "Update Role"]
    }
]
function init() {
    inquirer.prompt(menuQuestion).then(function (data) {
        switch (data.menu) {
            case "Add Department":
                addDepartment()
                break
            case "Add Role":
                addRole()
                break
            case "Add Employee":
                addEmployee()
                break
            case "View Department":
                viewDepartment()
                break
            case "View Role":
                viewRole()
                break
            case "View Employee":
                viewEmployee()
                break
            case "Update Role":
                updateRole()
                break
        }
    })
}

//adds a department
function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the department name?",
        name: "name",
    }).then(answer => {
        connection.query("insert into department(name) values(?)", answer.name, function (error) {
            console.log("Department added!")
            init()
        })
    })
};

//adds a role with questions for all column values
function addRole() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the title of this role?",
                name: "title",
            },
            {
                type: "number",
                message: "How much is the salary?",
                name: "salary",
            },
            {
                type: "number",
                message: "What is the department ID?",
                name: "departmentID",
            },
        ]
    ).then(answer => {
        connection.query("insert into role(title,salary,department_id) values(?,?,?)", [answer.title, answer.salary, answer.departmentID], function (error) {
            console.log("Role added!")
            init()
        })
    })
};

//adds an employee with questions for all column values
function addEmployee() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is your your first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is your your last name?",
                name: "lastName"
            },
            {
                type: "number",
                message: "What is your your role ID?",
                name: "roleID"
            },
            {
                type: "number",
                message: "What is your your manager ID?",
                name: "managerID"
            },
        ]
    ).then(answer => {
        connection.query("insert into employee(first_name,last_name,role_id,manager_id) values(?,?,?,?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function (error) {
            console.log("Employee added!")
            init()
        })
    })
};

//views the department in table form
function viewDepartment() {
    connection.query("SELECT * FROM employee_db.department", function (error, data) {
        console.table(data)
        init()
    })
};

//views the role in table form
function viewRole() {
    connection.query("SELECT * FROM employee_db.role", function (error, data) {
        console.table(data)
        init()
    })

};

//views the employees in table form
function viewEmployee() {
    connection.query("SELECT * FROM employee_db.employee", function (error, data) {
        console.table(data)
        init()
    })
};

//update a role from the table using the role ID
function updateRole() {
    inquirer.prompt(
        [
            {
                type: "number",
                message: "What is the role ID you would like to update?",
                name: "roleID",
            },
            {
                type: "input",
                message: "What is the new title?",
                name: "titleUpdate",
            },
            {
                type: "number",
                message: "What is the new Salary?",
                name: "salaryUpdate",
            },
            {
                type: "number",
                message: "What is the new departmentID?",
                name: "departmentIDUpdate",
            },
        ]
        ).then(answer => {
            var query = "UPDATE role SET ? WHERE ?";
            connection.query(query, [
                {title: answer.titleUpdate,
                salary: answer.salaryUpdate,
                department_id: answer.departmentIDUpdate,
                },
                {
                    id:answer.roleID
                }], function (error, data) {
            if(error) throw error;
                console.log("Role updated!")
                init()
            })
        })
    };