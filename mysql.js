const mysql = require('mysql')
const { connect } = require('net')

const conection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'prueba'
})

function temperatura_sql(min, max) {
    min = Math.ceil(25);
    max = Math.floor(32);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function hora_sql(){
    const d = new Date()
    var horas = d.toLocaleTimeString()
    formated = horas.replaceAll(':','')
    return formated
}

var h = hora_sql()
var t = temperatura_sql()

conection.connect( (err) => {
    if(err) throw err
    console.log('la conexion funciona')
})



conection.query(`INSERT INTO eventos (hora, medicion) VALUES(${h}, ${t})` , (err, rows) => {
    if(err) throw err
    console.log('la conexion funciona') 
    console.log(h)
})

conection.query('SELECT * FROM eventos', (err, rows) => {
    console.log(rows)

})


function prueba(){
    conection.query(`INSERT INTO eventos (hora, medicion) VALUES(${h}, ${t})` , (err, rows) => {
        if(err) throw err
        
        document.getElementById('elementos').innerHTML = h;
    })
    
}



conection.end()
