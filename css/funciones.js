/* var client = new Paho.MQTT.Client("82c5d775371f4fb89ca52b525b0a7e0a.s2.eu.hivemq.cloud", 8883, "Santiago");

client.username = "santiago";
client.password = "Caracoles123";

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({onSuccess:onConnect});

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("/distancia"); 
    client.subscribe("/distancia2"); 
    client.subscribe("/distancia3"); 
  }

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}
   // called when a message arrives
function onMessageArrived(message) {
  var msg = JSON.parse(message.payloadString); 
  console.log("onMessageArrived:" + message.destinationName + message.payloadString);
  var distanciaActual = msg.distancia;

  console.log(distanciaActual);
  if (message.destinationName === "/distancia") {
    var lugares = document.querySelectorAll(".lugarPrimero");

    lugares.forEach(function(lugar) {
  
      lugar.style.backgroundRepeat = "no-repeat";
      lugar.style.backgroundPosition = "center center";
  
      if (distanciaActual <= 5) {
        lugar.classList.add("distancia-menor-h2");
        lugar.setAttribute("style", "background-color: red;");
        lugar.style.backgroundImage = "url('css/pngegg.png')";
        lugar.querySelector("h2").style.display = "none";
      } else {
        lugar.classList.remove("distancia-menor-h2");
        lugar.setAttribute("style", "background-color: green;");
        lugar.querySelector("h2").style.display = "block";
      }
    });
  }else if(message.destinationName === "/distancia2"){
    var lugares = document.querySelectorAll(".lugarSegundo");

    lugares.forEach(function(lugar) {
  
      lugar.style.backgroundRepeat = "no-repeat";
      lugar.style.backgroundPosition = "center center";
  
      if (distanciaActual <= 5) {
        lugar.classList.add("distancia-menor-h2");
        lugar.setAttribute("style", "background-color: red;");
        lugar.style.backgroundImage = "url('css/pngegg.png')";
        lugar.querySelector("h2").style.display = "none";
      } else {
        lugar.classList.remove("distancia-menor-h2");
        lugar.setAttribute("style", "background-color: green;");
        lugar.querySelector("h2").style.display = "block";
      }
    });
  }else if(message.destinationName === "/distancia3"){
    var lugares = document.querySelectorAll(".lugarSegundo");

    lugares.forEach(function(lugar) {
  
      lugar.style.backgroundRepeat = "no-repeat";
      lugar.style.backgroundPosition = "center center";
  
      if (distanciaActual <= 5) {
        lugar.classList.add("distancia-menor-h2");
        lugar.setAttribute("style", "background-color: red;");
        lugar.style.backgroundImage = "url('css/pngegg.png')";
        lugar.querySelector("h2").style.display = "none";
      } else {
        lugar.classList.remove("distancia-menor-h2");
        lugar.setAttribute("style", "background-color: green;");
        lugar.querySelector("h2").style.display = "block";
      }
    });
  }

}
 */

// Crear un cliente MQTT
var client = new Paho.MQTT.Client("82c5d775371f4fb89ca52b525b0a7e0a.s2.eu.hivemq.cloud", 8883, "santiago");

// Definir las credenciales de autenticación
client.username = "santiago";
client.password = "Caracoles123";

// Definir los callbacks
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Conectar al broker MQTT de HiveMQ
client.connect({ onSuccess: onConnect });

// Callback de conexión exitosa
function onConnect() {
  console.log("Conectado al broker MQTT");
}

// Callback de pérdida de conexión
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Conexión perdida: " + responseObject.errorMessage);
  }
}

// Callback de llegada de mensaje
function onMessageArrived(message) {
  console.log("Mensaje recibido: " + message.payloadString);
}