var client = new Paho.MQTT.Client("wss://ip172-19-0-25-chsmuhefml8g008e233g-9001.direct.labs.play-with-docker.com/:9001/mqtt", 9001, "Santiago");

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({onSuccess:onConnect});

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("/distancia"); 
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

  var lugares = document.querySelectorAll(".lugar");

  lugares.forEach(function(lugar) {

    lugar.style.backgroundRepeat = "no-repeat";
    lugar.style.backgroundPosition = "center center";

    if (distanciaActual <= 5) {
      lugar.classList.add("distancia-menor-h2");
      lugar.setAttribute("style", "background-color: red;");
      lugar.style.backgroundImage = "url('pngegg.png')";
      lugar.querySelector("h2").style.display = "none";
    } else {
      lugar.classList.remove("distancia-menor-h2");
      lugar.setAttribute("style", "background-color: green;");
      lugar.querySelector("h2").style.display = "block";
    }
  });
}
//'{"lat": 19, "long": -91.34343, "mensaje": "hola"}'

  