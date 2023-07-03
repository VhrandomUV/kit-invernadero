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


function distancia(min, max){
    min = Math.ceil(1)
    max = Math.floor(200)
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function luminocidad(min, max){
    const d = new Date()

    var horas = d.getHours()
    if (horas > 18 ||  horas < 7){
      luz = 0
    }

    if (horas <= 18 || horas >= 7){
      luz = 1
    }
    return luz

}


var l = luminocidad()
var d = distancia()
var f = fecha() 
var hum = humendad_sql()
var h = hora_sql()
var t = temperatura_sql()


function toldo(estado){
    if (l == 0 || d <75){
        estado = 'cerrado'
    }
    else{
        estado = 'abierto'
    }

    return estado
}

var e = toldo()

conection.connect( (err) => {
    if(err) throw err
    console.log('la conexion funciona')
})


conection.query(`INSERT INTO eventos (hora, medicion, fecha) VALUES(${h}, ${d}, '${f}')` , (err, rows) => {
    if(err) throw err
    
    console.log(d)
    console.log(h)
    console.log(f)
})

conection.query(`INSERT INTO humedad (fecha, humedad, temperatura, hora) VALUES('${f}' ,${hum}, ${t}, ${h})` , (err, rows) => {
    if(err) throw err
    
    console.log(f)
})

conection.query(`INSERT INTO luminosidad (hora, fecha, luz) VALUES(${h}, '${f}', ${l})` , (err, rows) => {
    if(err) throw err
    
    console.log(l)

})

conection.query(`INSERT INTO toldo (estado, hora, fecha) VALUES('${e}', ${h}, '${f}')` , (err, rows) => {
    if(err) throw err
    
    console.log(e)
})  





conection.end()
