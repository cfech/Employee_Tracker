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
