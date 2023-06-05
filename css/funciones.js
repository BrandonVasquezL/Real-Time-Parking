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
var mqtt = require('mqtt')

var options = {
    host: '84d6d3a473904ee7bb63c3ce96c6b8a6.s2.eu.hivemq.cloud',
    port: 8884,
    protocol: 'mqtts',
    username: 'Santiago',
    password: 'Caracoles123'
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');