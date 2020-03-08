//Requires

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// const add = require(__dirname,"addFunctions.js")

// require('pass.env').config()

// const result = dotenv.config()

// if (result.error) {
//   throw result.error
// }

var possDelArray = []
//Connections 

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    // password: process.env.DB_PASS,
    password: "xxxxx",
    database: "company_db"
});





connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    initialPrompt()
    // getDepForDelete()
});




//inquirer functions

function initialPrompt() {
    inquirer.prompt(initQuestion)
        .then(function (data) {
            console.log(data)
            var action = data.action
            console.log(action)

            if (action === "View All Departments") {
                viewAllDataDepartments()
            } else if (action === "View All Roles") {
                viewAllRoles()
            } else if (action === "View All Employees") {
                viewAllEmployees()
            } else if (action === "Add Employee") {
                addEmployeePrompt()
            } else if (action === "Add Role") {
                addRolePrompt()
            } else if (action === "Add Department") {
                addDepPrompt()
            } else if (action === "Remove Department") {
                getDepForDelete()
            }else if (action == "Remove Employee"){
                getEmployeesForDelete()
            }else if (action === "Remove Role"){
                getroleForDelete()
            }
            else if (action === "Quit") {
                endConnection()
            }

        })
}



// employee functions 
function addEmployeePrompt() {
    inquirer.prompt(addEmployeeQuestionsArray)
        .then(function (newEmployeeInfo) {
            console.log(newEmployeeInfo)
            addEmployee(newEmployeeInfo)

        })
}

function addEmployee(newEmployeeInfo) {
    let fName = newEmployeeInfo.employeeFirstName
    let lName = newEmployeeInfo.employeeLastName
    let job = newEmployeeInfo.employeeRole
    console.log("add employee function")
    var query = connection.query(
        "INSERT INTO employee SET ?",
        {

            first_name: fName,
            last_name: lName,
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " person inserted!\n");
            initialPrompt()
        }
    )
}



function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        let employeeArray = res
        console.table(employeeArray)
        initialPrompt()

    });
}


function deleteEmployeePrompt() {
    inquirer.prompt(deleteEmployeeArray)
        .then(function (res) {

            var deletedEmployee = res.deletedEmployee

            
            console.log(deletedEmployee)

            deleteEmployee(deletedEmployee)
        })
}





function getEmployeesForDelete() {

    connection.query("SELECT first_name FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        possDelEmployeeArray = res
        // console.table(departmentsArray)
        console.table(possDelEmployeeArray)

        // var possDelEmployeeArray = []

        // for (let i = 0; departmentsArray.length < i ; i++){

        //     possDelEmployeeArray.push(departmentsArray[i])
        //     console.log("inn for loop")

        // }
        console.log("skipped the for loop")
        console.log(possDelEmployeeArray)
        deleteEmployeePrompt(JSON.stringify(possDelEmployeeArray))

    });
}




function deleteEmployee(deletedEmployee) {

console.log("in delemployeefunction function " + deletedEmployee)


    console.log("Deleting employee...\n");
    connection.query(
        "DELETE FROM employee WHERE ?",
        {
         first_name: deletedEmployee
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee(s) was deleted!\n");
            // Call readSongs AFTER the DELETE completes
            initialPrompt()
        }
    );
}








// role functions 
function addRolePrompt() {
    inquirer.prompt(addroleQuestionsArray)
        .then(function (newroleInfo) {
            console.log(newroleInfo)
            addRole(newroleInfo)

        })
}


function addRole(newroleInfo) {
    let title = newroleInfo.newRoleName
    let salary = newroleInfo.newRoleSalary

    console.log("add role function")
    var query = connection.query(
        "INSERT INTO roles SET ?",
        {

            title: title,
            salary: salary,
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role inserted!\n");
            initialPrompt()
        }
    )
}


function viewAllRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        let rolesArray = res

        console.table(rolesArray)
        initialPrompt()

    });
}



//delete department functions

function deleteRolePrompt() {
    inquirer.prompt(deleteRoleArray)
        .then(function (res) {

            var deletedRoleValue = res.deletedRole

           
            console.log(deletedRoleValue)




            deleteRole(deletedRoleValue)
        })
}





function getroleForDelete() {

    connection.query("SELECT title FROM roles", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        possroleDeleted = res
        // console.table(departmentsArray)
        console.table(possroleDeleted)

        // var possroleDeleted = []

        // for (let i = 0; departmentsArray.length < i ; i++){

        //     possroleDeleted.push(departmentsArray[i])
        //     console.log("inn for loop")

        // }
      
        console.log(possroleDeleted)
        deleteRolePrompt(JSON.stringify(possroleDeleted))

    });
}




function deleteRole(deletedRoleValue) {

console.log("in deleteRole function " + deletedRoleValue)


    console.log("Deleting department...\n");
    connection.query(
        "DELETE FROM roles WHERE ?",
        {
            title: deletedRoleValue
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role(s) was deleted!\n");
            // Call readSongs AFTER the DELETE completes
            initialPrompt()
        }
    );
}


























// Department functions
function addDepPrompt() {
    inquirer.prompt(addDepartmentQuestionsArray)
        .then(function (newDep) {
            console.log(newDep)
            addDep(newDep)

        })

}


function addDep(newDep) {
    let name = newDep.newDepName


    console.log("add dep function")
    var query = connection.query(
        "INSERT INTO department SET ?",
        {

            name: name,

        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department inserted!\n");
            initialPrompt()
        }
    )
}

function viewAllDataDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        let departmentsArray = res
        console.table(departmentsArray)
        initialPrompt()

    });
}




//delete department functions

function deleteDepPrompt() {
    inquirer.prompt(deleteDepArray)
        .then(function (res) {

            console.log(res)
            var deletedDepartment = res.deletedDep
            console.log((deletedDepartment))
            



            deleteDep(deletedDepartment)
        })
}





function getDepForDelete() {

    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        possDelArray = res
        // console.table(departmentsArray)
        console.table(possDelArray)

        // var possDelArray = []

        // for (let i = 0; departmentsArray.length < i ; i++){

        //     possDelArray.push(departmentsArray[i])
        //     console.log("inn for loop")

        // }
        console.log("skipped the for loop")
        console.log(possDelArray)
        deleteDepPrompt(JSON.stringify(possDelArray))

    });
}




function deleteDep(deletedDepartment) {

console.log("in delDepartment function " + deletedDepartment)


    console.log("Deleting department...\n");
    connection.query(
        "DELETE FROM department WHERE ?",
        {
            name: deletedDepartment
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows +  " department(s) was deleted!\n");
            // Call readSongs AFTER the DELETE completes
            initialPrompt()
        }
    );
}










// End connection function
function endConnection() {
    console.log("Goodbye")
    connection.end()
}




//Inquire question Arrays 

//Initial Questions
const initQuestion = [
    {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by department", "Add Employee", "Update Employee Role", "Remove Employee","View All Roles", "Add Role","Remove Role", "View All Departments", "Add Department", "Remove Department", "Quit"]
    }
];


//employee questions 
const addEmployeeQuestionsArray = [
    {
        name: "employeeFirstName",
        type: "Input",
        message: "What is the employees first name",
        default: "Connor"

    },
    {
        name: "employeeLastName",
        type: "Input",
        message: "What is the employees last name",
        default: "Fech"

    },
    {
        name: "employeeRole",
        type: "list",
        message: "What is the employees role",
        choices: ["Accountant", "Sales Person", "Marketer"],
    },
]



const deleteEmployeeArray = [
    {
        name: "deletedEmployee",
        type: "list",
        message: "What employee would you like to delete",
        choices: ["Jeff", "Test"] // have to pass an array 
    }
]


const addroleQuestionsArray = [
    {
        name: "newRoleName",
        type: "Input",
        message: "What new role would you like to add ?",
        default: "Financial Analyst"

    },
    {
        name: "newRoleSalary",
        type: "Input",
        message: "What is the salary of this new role",
        default: 75000

    }
]

const deleteRoleArray = [
    {
        name: "deletedRole",
        type: "list",
        message: "What employee would you like to delete",
        choices: ["Test"] // have to pass an array 
    }
]








const addDepartmentQuestionsArray = [
    {
        name: "newDepName",
        type: "Input",
        message: "What new department would you lie to add?",
        default: "Finance"

    },

]

const deleteDepArray = [
    {
        name: "deletedDep",
        type: "list",
        message: "What department would you like to delete",
        choices: ["Finance"] // have to pass an array 
    }
]




//Bonus stuff
// bonus =[
// "Update Employee Manager",
// "View All Employees by Manager",
// "Remove Employee",
// "Remove Department",
// "Remove Role",
// ]