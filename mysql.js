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


function fecha() {
    var d = new Date();
    var fecha = d.toLocaleDateString();
    formated = fecha.replaceAll('-','/')
    return formated
}

function humendad_sql(min, max) {
    min = Math.ceil(55);
    max = Math.floor(70);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

var f = fecha() 

var hum = humendad_sql()
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

conection.query(`INSERT INTO humedad (fecha, humedad, temperatura, hora) VALUES('${f}' ,${hum}, ${t}, ${h})` , (err, rows) => {
    if(err) throw err
    console.log('la conexion funciona') 
    console.log(f)
})



conection.end()
