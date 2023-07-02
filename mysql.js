const mysql = require('mysql')
const { connect } = require('net')

const conection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'prueba'
})

function getTemperatura(min, max) {
    min = Math.ceil(25);
    max = Math.floor(32);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function hora(){
    const d = new Date()
    var horas = d.toLocaleTimeString()
    formated = horas.replace(':','')
    formated = formated.replace(':','')
    return formated
}

var h = hora()
var t = getTemperatura()

conection.connect( (err) => {
    if(err) throw err
    console.log('la conexion funciona')
})

conection.query('SELECT * FROM eventos', (err, rows) => {
    console.log(rows)

})

conection.query(`INSERT INTO eventos (hora, medicion) VALUES(${h}, ${t})` , (err, rows) => {
    if(err) throw err
    console.log('la conexion funciona') 
    console.log(h)
})
    
conection.end()
