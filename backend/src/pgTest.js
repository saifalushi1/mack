const {Client} = require("pg")

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootuser",
    database: "mack"
})

client.connect()
client.query(`Select * FROM users`, (err, res) => {
    if(!err){
        console.log(res.rows)
    } else{
        console.log(err.message)
    }
    client.end;
})