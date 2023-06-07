function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

const randomString = generateRandomString(10);
console.log(randomString); 

document.addEventListener('DOMContentLoaded', function() {
  const randomString = generateRandomString(10);
  console.log(randomString);
});


var client = new Paho.MQTT.Client("52.249.208.23", 9001, randomString);

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({onSuccess:onConnect});

function onConnect() {
  console.log("onConnect");
  client.subscribe("/distancia"); 
  client.subscribe("/distancia2"); 
  client.subscribe("/distancia3"); 
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}
var i = 0;
var ban = false
var ban2 = false
var inicio
var fin
var segundosPasados
var tiempoPasado


var i2 = 0;
var ban3 = false
var ban4 = false
var inicio2
var fin2
var segundosPasados2
var tiempoPasado2

var i3 = 0;
var ban5 = false
var ban6 = false
var inicio3
var fin3
var segundosPasados3
var tiempoPasado3

function onMessageArrived(message) {
  var msg = JSON.parse(message.payloadString);
  console.log("onMessageArrived:" + message.destinationName + message.payloadString);
  var distanciaActual = msg.distancia;
  

  console.log(distanciaActual);
  if (message.destinationName === "/distancia") {
    var lugares = document.querySelectorAll(".lugarPrimero");

    lugares.forEach(function(lugarElement) {
      lugarElement.style.backgroundRepeat = "no-repeat";
      lugarElement.style.backgroundPosition = "center center";

      if (distanciaActual <= 5) {
        
        ban2=true
        if(ban2==true){
           inicio = new Date();
          i++ 
        }


        lugarElement.classList.add("distancia-menor-h2");
        lugarElement.setAttribute("style", "background-color: red;");
        lugarElement.style.backgroundImage = "url('css/pngegg.png')";
        lugarElement.querySelector("h2").style.display = "none";
      } else {
        ban2=false
        lugarElement.classList.remove("distancia-menor-h2");
        if(i>=1){
          ban=true
           fin = new Date();
           tiempoPasado = fin - inicio;
           segundosPasados = tiempoPasado / 1000;
        }
        console.log(segundosPasados)
        if(ban == true){
          fetch("https://apirest-production-3b72.up.railway.app/parking/post/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",   
                    },
                    body: JSON.stringify({
                      lugar: "lugar1",
                      tiempo: segundosPasados
                    })
                  })
                    .then(function(response) {
                      console.log("Datos enviados al backend:", response);
                      i=0;
                      ban=false
                      segundosPasados = 0;
                    })
                    .catch(function(error) {
                      console.error("Error al enviar los datos al backend:", error);
                    });
                  }
        lugarElement.setAttribute("style", "background-color: green;");
        lugarElement.querySelector("h2").style.display = "block";
        lugarElement.querySelector("h4")
      }
    });
  } else if (message.destinationName === "/distancia2") {
    var lugares = document.querySelectorAll(".lugarSegundo");

    lugares.forEach(function(lugarElement) {
      lugarElement.style.backgroundRepeat = "no-repeat";
      lugarElement.style.backgroundPosition = "center center";

      if (distanciaActual <= 5) {

        ban4=true
        if(ban4==true){
           inicio = new Date();
          i2++ 
        }

        lugarElement.classList.add("distancia-menor-h2");
        lugarElement.setAttribute("style", "background-color: red;");
        lugarElement.style.backgroundImage = "url('css/pngegg.png')";
        lugarElement.querySelector("h2").style.display = "none";
      } else {
        ban4=false
        lugarElement.classList.remove("distancia-menor-h2");
        if(i2>=1){
          ban3=true
           fin = new Date();
           tiempoPasado2 = fin2 - inicio2;
           segundosPasados2 = tiempoPasado2 / 1000;
        }
        console.log(segundosPasados)
        if(ban3 == true){
          fetch("https://apirest-production-3b72.up.railway.app/parking/post/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",   
                    },
                    body: JSON.stringify({
                      lugar: "lugar2",
                      tiempo: segundosPasados2
                    })
                  })
                    .then(function(response) {
                      console.log("Datos enviados al backend:", response);
                      i2=0;
                      ban3=false
                      segundosPasados2 = 0;
                    })
                    .catch(function(error) {
                      console.error("Error al enviar los datos al backend:", error);
                    });
                  }
        lugarElement.setAttribute("style", "background-color: green;");
        lugarElement.querySelector("h2").style.display = "block";
        lugarElement.querySelector("h4")
        lugarElement.setAttribute("style", "background-color: green;");

      }
    });
  } else if (message.destinationName === "/distancia3") {
    var lugares = document.querySelectorAll(".lugarTercero");

    lugares.forEach(function(lugarElement) {
      lugarElement.style.backgroundRepeat = "no-repeat";
      lugarElement.style.backgroundPosition = "center center";

      if (distanciaActual <= 5) {

        ban6=true
        if(ban6==true){
           inicio3 = new Date();
          i3++ 
        }

        lugarElement.classList.add("distancia-menor-h2");
        lugarElement.setAttribute("style", "background-color: red;");
        lugarElement.style.backgroundImage = "url('css/pngegg.png')";
        lugarElement.querySelector("h2").style.display = "none";
      } else {
        ban6=false
        lugarElement.classList.remove("distancia-menor-h2");
        if(i3>=1){
          ban5=true
           fin3 = new Date();
           tiempoPasado3 = fin3 - inicio3;
           segundosPasados3 = tiempoPasado3 / 1000;
           
        }
        
       
        

        console.log(segundosPasados)
        if(ban5 == true){
        /*  var horaElement = lugarElement.querySelector(".hora3"); // Seleccionar el elemento con la clase "hora3"
        if (horaElement) {
          var h4Element = horaElement.querySelector("h4"); // Seleccionar el elemento <h4> dentro de "hora3"
          if (h4Element) {
            h4Element.textContent = segundosPasados3; // Escribir segundosPasados3 en el elemento <h4>
          }}*/
          fetch("https://apirest-production-3b72.up.railway.app/parking/post/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",   
                    },
                    body: JSON.stringify({
                      lugar: "lugar3",
                      tiempo: segundosPasados3
                    })
                  })
                    .then(function(response) {
                      console.log("Datos enviados al backend:", response);
                      i3=0;
                      ban5=false
                      segundosPasados3 = 0;
                    })
                    .catch(function(error) {
                      console.error("Error al enviar los datos al backend:", error);
                    });
                  }
        lugarElement.setAttribute("style", "background-color: green;");
        lugarElement.querySelector("h2").style.display = "block";
        
        lugarElement.setAttribute("style", "background-color: green;");
      }
    });
  }
}