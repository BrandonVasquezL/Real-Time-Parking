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
       /* */

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
        

      /*  fetch("http://127.0.0.1:8000/parking/post/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",   
          },
          body: JSON.stringify({
            lugar: "lugar2",
            tiempo: tiempoOcupado
          })
        })
          .then(function(response) {
            console.log("Datos enviados al backend:", response);
          })
          .catch(function(error) {
            console.error("Error al enviar los datos al backend:", error);
          });*/

        lugarElement.classList.add("distancia-menor-h2");
        lugarElement.setAttribute("style", "background-color: red;");
        lugarElement.style.backgroundImage = "url('css/pngegg.png')";
        lugarElement.querySelector("h2").style.display = "none";
      } else {
        lugarElement.classList.remove("distancia-menor-h2");
        lugarElement.setAttribute("style", "background-color: green;");
        lugarElement.querySelector("h2").style.display = "block";
      }
    });
  } else if (message.destinationName === "/distancia3") {
    var lugares = document.querySelectorAll(".lugarTercero");

    lugares.forEach(function(lugarElement) {
      lugarElement.style.backgroundRepeat = "no-repeat";
      lugarElement.style.backgroundPosition = "center center";

      if (distanciaActual <= 5) {
       
       /* fetch("http://127.0.0.1:8000/parking/post/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",   
          },
          body: JSON.stringify({
            lugar: "lugar3",
            tiempo: tiempoOcupado
          })
        })
          .then(function(response) {
            console.log("Datos enviados al backend:", response);
          })
          .catch(function(error) {
            console.error("Error al enviar los datos al backend:", error);
          });*/

        lugarElement.classList.add("distancia-menor-h2");
        lugarElement.setAttribute("style", "background-color: red;");
        lugarElement.style.backgroundImage = "url('css/pngegg.png')";
        lugarElement.querySelector("h2").style.display = "none";
      } else {
        lugarElement.classList.remove("distancia-menor-h2");
        lugarElement.setAttribute("style", "background-color: green;");
        lugarElement.querySelector("h2").style.display = "block";
      }
    });
  }
}