
function getTemperatura(min, max) {
    min = Math.ceil(25);
    max = Math.floor(32);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function getHumendad(min, max) {
    min = Math.ceil(55);
    max = Math.floor(70);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }



  let temperatura;
  let huemdad;

  

  
  function update() {
    var datetime = new Date();
    var formatedTime = datetime.toLocaleString();
    huemdad = getHumendad();
    temperatura = getTemperatura();
    document.getElementById('elementos').innerHTML = temperatura + '°C' +' '+ huemdad + '%' +' '+ formatedTime;
    
  
  }
  

  function hora(){
    var datetime = new Date();
    var formatedTime = datetime.toLocaleTimeString();
    const d = new Date()

    var horas = d.getHours()
    if (horas > 18 ||  horas < 7){
      document.getElementById('hora').innerHTML ='Es de noche: Toldo Cerrado' + " " + formatedTime ;
    }

    if (horas <= 18 || horas >= 7){
      document.getElementById('hora').innerHTML ='Es de día: Toldo Abierto' + " " + formatedTime ;
    }
    
    
  }
