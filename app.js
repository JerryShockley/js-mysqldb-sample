const mysql = require('mysql')

const con = mysql.createConnection({
  host: '192.168.5.99',
  port: '3306',
  user: 'dbuser',
  password: 'secret',
  database: 'db1'
})

var createPeopleTableSQL = `CREATE TABLE IF NOT EXISTS People (
                          id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          firstname VARCHAR(30) NOT NULL,
                          lastname VARCHAR(50) NOT NULL,
                          email  VARCHAR(70) NOT NULL,
                          gender  VARCHAR(15) NOT NULL,
                          age int(3) UNSIGNED)`

var insertPeopleDataSQL = `INSERT INTO People (
                              firstname,
                              lastname,
                              email,
                              gender,
                              age)
                          VALUES ?`
con.connect((err) => {
  if (err) throw err
  console.log('Connected to MySQL db1!')

  con.query(createPeopleTableSQL, (err, result) => {
    if (err) throw err
    console.log("Successfully created 'People' Table")
  })

  con.query(insertPeopleDataSQL, [fetchRowData()], (err, result) => {
    if (err) throw err
    console.log("Inserted " + result.affectedRows + " records.")
  })
})



function fetchRowData() {
  var data = [
    ['Joe', 'Samuels', 'joes@msn.com', 'male', 33],
    ['Julie', 'Blankenship', 'charmer@gmail.com', 'female', 22],
    ['Sam', 'Snodgrass', 'ssgrass@youtube.com', 'male', 53 ],
    ['Jenna', 'Cross', 'jcross@smu.edu', 'female', 21],
    ['Horatio', 'Belk', 'hbelk23@gmail.com', 'male', 67],
    ['Janet', 'Smalls', 'smallsjanet@msn.com', 'female', 42]
]
  return data
}

