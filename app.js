const mysql = require('mysql2/promise')

const dbConfig = {
  host: '192.168.5.99',
  port: '3306',
  user: 'dbuser',
  password: 'secret',
  database: 'db1'
}

async function main() {
  con = await mysql.createConnection( dbConfig )
  console.log(`Successfully connected to ${dbConfig.database} ` +
              `database as '${dbConfig.user}'`)
  result = await con.query(createPeopleTableSQL)
  console.log(`Successfully created 'People' Table if it didn't already exist`)

  const [rows, fields] = await con.query(insertPeopleDataSQL, [fetchRowData()])
  console.log(`Inserted ${rows.affectedRows} +  records.\n`)
  console.log( fetchRowData() )

  await con.end()
  console.log( "Closed DB connection" )
  return
}

let createPeopleTableSQL = `CREATE TABLE IF NOT EXISTS People (
                              id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                              firstname VARCHAR(30) NOT NULL,
                              lastname VARCHAR(50) NOT NULL,
                              email  VARCHAR(70) NOT NULL,
                              gender  VARCHAR(15) NOT NULL,
                              age int(3) UNSIGNED)`


let insertPeopleDataSQL = `INSERT INTO People (
                            firstname,
                            lastname,
                            email,
                            gender,
                            age)
                          VALUES ?`

function fetchRowData() {
  let data = [
    ['Joe', 'Samuels', 'joes@msn.com', 'male', 33],
    ['Julie', 'Blankenship', 'charmer@gmail.com', 'female', 22],
    ['Sam', 'Snodgrass', 'ssgrass@youtube.com', 'male', 53 ],
    ['Jenna', 'Cross', 'jcross@smu.edu', 'female', 21],
    ['Horatio', 'Belk', 'hbelk23@gmail.com', 'male', 67],
    ['Janet', 'Smalls', 'smallsjanet@msn.com', 'female', 42]
]
  return data
}

main()
