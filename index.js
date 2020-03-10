//Requires
var Font = require('ascii-art-font');
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require("dotenv").config()

// Font.create('my text', 'Doom', function(rendered){
//     console.log(rendered)
// });


//Connections 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "company_db3"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    initialPrompt()

});

//Initial prompt
function initialPrompt() {
    inquirer.prompt(initQuestion)
        .then(function (data) {

            var action = data.action

            // If statement for what is selected 
            if (action === "View All Departments") {
                viewAllDataDepartments()
            } else if (action === "View All Roles") {
                viewAllRoles()
            } else if (action === "View All Employees") {
                viewAllEmployees()
            } else if (action === "View All Employees by department") {
                viewAllEmployeesByDepartment()
            } else if (action === "Add Employee") {
                getManagersForAssignment()
            } else if (action === "Add Role") {
                addRolePrompt()
            } else if (action === "Add Department") {
                addDepPrompt()
            } else if (action === "Remove Department") {
                getDepForDelete()
            } else if (action == "Remove Employee") {
                getEmployeesForDelete()
            } else if (action === "Remove Role") {
                getRoleForDelete()
            } else if (action === "Update Employee Role") {
                getRolesForEmployeeRoleUpdate()
            } else if (action === "Quit") {
                endConnection()
            }
        })
}

//Initial Questions
const initQuestion = [
    {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by department", "Add Employee", "Update Employee Role", "Remove Employee", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "Quit"]
    }
];

// employee functions 

//Getting managers for assignment to new employee
function getManagersForAssignment() {
    connection.query("SELECT * FROM employee WHERE manager_id = 1500 ", function (err, managerRes) {
        if (err) throw err;

        //Array to be used in for loop
        var managersForAssignment = (managerRes)

        //Array to  be used in inquirer choices 
        var managerToBeAssigned = []

        //For loop creating an object for inquirer to read 
        for (let i = 0; managersForAssignment.length > i; i++) {
            var managerOption = {
                value: managersForAssignment[i].id,
                name: managersForAssignment[i].first_name
            }
            //pushing new object to managerToBeAssigned array
            managerToBeAssigned.push(managerOption)


        }

        //Calling get role for assignment and passing along inquirer choices
        getRoleForAssignment(managerToBeAssigned)
    })
}

// Getting role for assignment fo new employee
function getRoleForAssignment(managerToBeAssigned) {
    connection.query("SELECT title, id FROM roles", function (err, res) {
        if (err) throw err;

        //Array to be used in for loop
        var possAssignmentArray = res

        //Array to  be used in inquirer choices 
        var roleToBeAssigned = []

        //For loop creating an object for inquirer to read 
        for (let i = 0; possAssignmentArray.length > i; i++) {
            var option = {
                value: possAssignmentArray[i].id,
                name: possAssignmentArray[i].title,
            }

            //pushing new object to roleToBeAssigned array
            roleToBeAssigned.push(option)
        }

        //Inquirer questions to be asked when adding a new employee
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
                choices: roleToBeAssigned
            },
            {
                name: "employeeManager",
                type: "list",
                message: "What is the employees manager?",
                choices: managerToBeAssigned,
            }
        ]

        //Calling inquirer prompt function and passing it the array of questions 
        addEmployeePrompt(addEmployeeQuestionsArray)
    });
}


//Add Employee inquirer function 
function addEmployeePrompt(addEmployeeQuestionsArray) {
    inquirer.prompt(addEmployeeQuestionsArray)
        .then(function (newEmployeeInfo) {

            //Calling the addEmployee function and passing it the answers to the inquirer questions 
            addEmployee(newEmployeeInfo)
        })
}

// Adding new employee to the data base 
function addEmployee(newEmployeeInfo) {

    //variables needed 
    let fName = newEmployeeInfo.employeeFirstName
    let lName = newEmployeeInfo.employeeLastName
    let job = newEmployeeInfo.employeeRole
    let manager = newEmployeeInfo.employeeManager

    //Inserting user answers into table 
    var query = connection.query(
        "INSERT INTO employee SET ?",
        {

            first_name: fName,
            last_name: lName,
            role_id: job,
            manager_id: manager
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " person inserted!\n");
            initialPrompt()
        }
    )
}

// View all employees function 
function viewAllEmployees() {
    connection.query("SELECT * FROM employee ", function (err, res) { // have to change join  statement 
        if (err) throw err;
        // Log all results of the SELECT statement
        let employeeArray = res
        console.table(employeeArray)
        initialPrompt()

    });
}

// employee.id, first_name, last_name, FROM employee LEFT JOIN roles ON employee.role_id = roles.id

//View all employees by department 
function viewAllEmployeesByDepartment() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name FROM employee AND roles.title, roles.salary, roles.department_id FROM roles JOIN ON employee.role_id = roles.id ", function (err, res) { // have to fix join statement 
        if (err) throw err;
        // Log all results of the SELECT statement
        let employeeDepartmentsArray = res
        console.table(employeeDepartmentsArray)
        initialPrompt()
    });
}

// Delete employees functions 
//Gets the list of employees for deletion 
function getEmployeesForDelete() {

    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        //array to be used in for loop
        var possDelEmployeeArray = res

        //Array to  be used in inquirer choices 
        var employeesToBeDeleted = []

        //For loop creating and array for inquirer to read
        for (let i = 0; possDelEmployeeArray.length > i; i++) {

            var employOption = {
                value: possDelEmployeeArray[i].id,
                name: possDelEmployeeArray[i].first_name,

            }

            //pushing the employee options to the employeesToBeDeleted function 
            employeesToBeDeleted.push(employOption)
        }

        //inquirer question for employee to be deleted 
        const deleteEmployeeArray = [
            {
                name: "deletedEmployee",
                type: "list",
                message: "What employee would you like to delete",
                choices: employeesToBeDeleted
            }
        ]

        //Calling the deleteEmployeePrompt and passing it the inquirer questions 
        deleteEmployeePrompt(deleteEmployeeArray)
    });
}

//deleteEmployeePrompt
function deleteEmployeePrompt(questions) {
    inquirer.prompt(questions)
        .then(function (res) {

            var employeeForDeletion = res.deletedEmployee

            //calling the deleteEmployee function and passing the Name & Id of the employee we wish to delete 
            deleteEmployee(employeeForDeletion)
        })
}


function deleteEmployee(employeeForDeletion) {

    //Query to delete employee of specific id 
    connection.query(
        "DELETE FROM employee WHERE ?",
        {
            id: employeeForDeletion
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee(s) was deleted!\n");
            initialPrompt()
        }
    );
}

//Role Functions 

// Updating employee role functions 

//getting roles to pass to inquirer prompt
function getRolesForEmployeeRoleUpdate() {

    //Selecting all roles 
    connection.query("SELECT * FROM roles", function (err, rolesRes) {
        if (err) throw err;

        //Array to be used in for loop
        var roleForUpdate = (rolesRes)

        //Array to be used in inquirer prompt
        var rolesToBeUpdated = []

        //For loop creating an array of objects for inquirer to read
        for (let i = 0; roleForUpdate.length > i; i++) {
            var rolesOption = {
                value: roleForUpdate[i].id,
                name: roleForUpdate[i].title
            }

            //Pushing newly created objects to rolesToBeUpdated Array
            rolesToBeUpdated.push(rolesOption)
        }

        getEmployeesForRoleUpdate(rolesToBeUpdated)
    })
}

//Getting employees to use in choices of inquirer 
function getEmployeesForRoleUpdate(rolesToBeUpdated) {

    //selecting everything from employees
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        //Array to be used in for loop
        var posUpdatedEmployeeRoleArray = res

        //Array to be used in inquirer 
        var employeesRoleToBeUpdated = []

        //For loop creating an array of objects for inquirer to read
        for (let i = 0; posUpdatedEmployeeRoleArray.length > i; i++) {
            var employOption = {
                value: posUpdatedEmployeeRoleArray[i].id,
                name: posUpdatedEmployeeRoleArray[i].first_name,
                role_id: posUpdatedEmployeeRoleArray[i].role_id
            }

            //Pushing newly created objects to employeesRoleToBeUpdated Array
            employeesRoleToBeUpdated.push(employOption)
        }

        //Inquirer questions to be prompted 
        const updateRoleQuestionsArray = [
            {
                name: "EmployeeToUpdate",
                type: "list",
                message: "What employee would you like to delete",
                choices: employeesRoleToBeUpdated
            },
            {
                name: "roleChange",
                type: "list",
                message: "What would you like their new role to be?",
                choices: rolesToBeUpdated
            }
        ]

        //Calling update role prompt and passing our questions 
        updateRolePrompt(updateRoleQuestionsArray)
    });
}

//Update role prompt prompts questions
function updateRolePrompt(updateRoleQuestionsArray) {
    inquirer.prompt(updateRoleQuestionsArray)
        .then(function (newEmployeeRole) {

            //Calling changeRole function and passing the inquirer answers 
            changeRole(newEmployeeRole)
        })
}

//Change role function
function changeRole(newEmployeeRole) {
    let employeeToBeUpdated = newEmployeeRole.EmployeeToUpdate
    let roleToBeChangedToo = newEmployeeRole.roleChange

    //Query to change role for selected employee
    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", function (err, res) { //need to update 
        console.log("in connection")
        [
            roleToBeChangedToo,
            employeeToBeUpdated
        ],

            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee(s) was deleted!\n");
                initialPrompt()
            }
    })
}

//View all roles 
function viewAllRoles() {
    connection.query("SELECT * FROM roles", function (err, res) { //should update 
        if (err) throw err;
        let rolesArray = res
        console.table(rolesArray)
        initialPrompt()
    });
}

//Prompts questions about the role to be added 
function addRolePrompt() {
    inquirer.prompt(addRoleQuestionsArray)
        .then(function (newroleInfo) {
            
            //calls add role function and passes the role information 
            addRole(newroleInfo)
        })
}

//Add role questions array
const addRoleQuestionsArray = [
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


//Adds new role to database 
function addRole(newroleInfo) {
    let title = newroleInfo.newRoleName
    let salary = newroleInfo.newRoleSalary
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

//Delete role functions 

//Gets the roles that could be deleted 
function getRoleForDelete() {

    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        
        //Array to be used in for loop 
        let possRoleDeleted = res

        //Array to be used in inquirer choices 
        var rolesToBeDeleted = []

        //For loop creating an array of objects for inquirer to read
        for (let i = 0; possRoleDeleted.length > i; i++) {
            var departmentOption = {
                value: possRoleDeleted[i].id,
                name: possRoleDeleted[i].title,
            }

            //Pushing newly created objects to rolesToBeDeleted array
            rolesToBeDeleted.push(departmentOption)
        }

        //Inquirer question to delete role
        const deleteRoleArray = [
            {
                name: "deletedRole",
                type: "list",
                message: "What department would you like to delete",
                choices: rolesToBeDeleted
            }
        ]

        //Calls deleteRolePrompt and passes the inquirer question 
        deleteRolePrompt(deleteRoleArray)
    });
}

//Delete role prompt
function deleteRolePrompt(questions) {
    inquirer.prompt(questions)
        .then(function (res) {
            
            //role to be deleted 
            var deletedRoleValue = res.deletedRole

            //Calling the delete role function and passing it the role to be deleted 
            deleteRole(deletedRoleValue)
        })
}

//Deletes the role from database 
function deleteRole(deletedRoleValue) {
    connection.query(
        "DELETE FROM roles WHERE ?",
        {
            id: deletedRoleValue
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role(s) was deleted!\n");
            initialPrompt()
        }
    );
}

// Department functions

//Add department prompt
function addDepPrompt() {
    inquirer.prompt(addDepartmentQuestionsArray)
        .then(function (newDep) {
            //calls add deparptment function and passes the inquirer answers
            addDep(newDep)
        })
}

//Add departments question array 
const addDepartmentQuestionsArray = [
    {
        name: "newDepName",
        type: "Input",
        message: "What new department would you lie to add?",
        default: "Finance"
    },
]

//Function to add new departments based on previous answers
function addDep(newDep) {
    let name = newDep.newDepName
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

//View all departments function
function viewAllDataDepartments() {
    connection.query("SELECT * FROM department", function (err, res) { //should edit 
        if (err) throw err;
        let departmentsArray = res
        console.table(departmentsArray)
        initialPrompt()
    });
}

//delete department functions

//Getting the current departments for deletion
function getDepForDelete() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        //Array to be used in fro loop 
        var possDelDepartmentsArray = res

        //Array to be used in inquirer functions
        var departmentsToBeDeleted = []

        //creating an array for inquirer to read
        for (let i = 0; possDelDepartmentsArray.length > i; i++) {
            var departmentOption = {
                value: possDelDepartmentsArray[i].id,
                name: possDelDepartmentsArray[i].name,
            }
            departmentsToBeDeleted.push(departmentOption)
        }

        //Inquirer question for deleting departments 
        const deleteDepArray = [
            {
                name: "deletedDep",
                type: "list",
                message: "What department would you like to delete",
                choices: departmentsToBeDeleted // have to pass an array 
            }
        ]

        //Calls delete department prompt and passes the inquirer questions
        deleteDepPrompt(deleteDepArray);
    });
}

//delete department prompt function 
function deleteDepPrompt(question) {
    inquirer.prompt(question)
        .then(function (res) {

            //Department for deletion
            var deletedDepartment = res.deletedDep

            //calling the function to delete the department and passing the department info
            deleteDep(deletedDepartment)
        })
}

//deleting the selected department from the database 
function deleteDep(deletedDepartment) {
    connection.query(
        "DELETE FROM department WHERE ?",
        {
            id: deletedDepartment
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department(s) was deleted!\n");
            initialPrompt()
        }
    );
}

// End connection function
function endConnection() {
    console.log("Goodbye")
    connection.end()
}

//Bonus stuff
// bonus =[
// "Update Employee Manager",
// "View All Employees by Manager",
// "Remove Employee",
// "Remove Department",
// "Remove Role",
// ]