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
});











//inquirer functions

function initialPrompt() {
    inquirer.prompt(initQuestion)
    .then(function (data) {
        console.log(data)
        var action = data.action
        console.log(action)

        if (action === "View All Departments"){
            viewAllDataDepartments()
        }else if (action === "View All Roles"){
            viewAllRoles()
        }else if (action === "View All Employees"){
            viewAllEmployees()
        }else if (action === "Add Employee"){
            addEmployeePrompt()
        }else if(action === "Add Role"){
            addRollPrompt()
        }else if (action === "Add Department"){
            addDepPrompt()
        }
        else if (action === "Quit"){
            endConnection()
        }

    })
}

function addEmployeePrompt(){
    inquirer.prompt(addEmployeeQuestionsArray)
    .then(function(newEmployeeInfo){
        console.log(newEmployeeInfo)
        addEmployee(newEmployeeInfo)
        
    })
}

function addRollPrompt(){
    inquirer.prompt(addRollQuestionsArray)
    .then(function(newRollInfo){
        console.log(newRollInfo)
        addRoll(newRollInfo)
        
    })
}

function addDepPrompt(){
    inquirer.prompt(addDepartmentQuestionsArray)
    .then(function(newDep){
        console.log(newDep)
        addDep(newDep)
        
    })
}




// End connection function
function endConnection(){
    console.log("Goodbye")
    connection.end()
}


//View Functions
function viewAllRoles(){
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
       let rolesArray = res
       
       console.table(rolesArray)
       initialPrompt()
          
      });
}


function viewAllEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
       let employeeArray = res
       console.table(employeeArray)
       initialPrompt()
          
      });
}


function viewAllDataDepartments(){
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
       let departmentsArray = res
       console.table(departmentsArray)
       initialPrompt()
          
      });
}



//Add functions

//Add employee

function addEmployee(newEmployeeInfo){
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
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " person inserted!\n");
        initialPrompt()
      }
    )
}



function addRoll(newRollInfo){
    let title = newRollInfo.newRoleName
    let salary = newRollInfo.newRoleSalary
    
    console.log("add roll function")
    var query = connection.query(
    "INSERT INTO roles SET ?",
      {
        
        title: title,
        salary: salary,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " role inserted!\n");
        initialPrompt()
      }
    )
}

function addDep(newDep){
    let name = newDep.newDepName
    
    
    console.log("add dep function")
    var query = connection.query(
    "INSERT INTO department SET ?",
      {
        
        name: name,
       
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " dep inserted!\n");
        initialPrompt()
      }
    )
}










//Inquire question Arrays 

//Initial Questions
const initQuestion = [
    {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees","View All Employees by department", "Add Employee",  "Update Employee Role", "View All Roles", "Add Role",  "View All Departments", "Add Department", "Quit"]
    }
];


//Add employee questions 
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
        choices:["Accountant", "Sales Person", "Marketer"],
    },
]

const addRollQuestionsArray = [
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

const addDepartmentQuestionsArray= [
    {
        name: "newDepName",
        type: "Input",
        message: "What new department would you lie to add?",
        default: "Finance"
        
    },
   
]




//Bonus stuff
bonus =[
"Update Employee Manager",
"View All Employees by Manager",
"Remove Employee",
"Remove Department",
"Remove Role",

]