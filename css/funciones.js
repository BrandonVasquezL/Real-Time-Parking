var client = new Paho.MQTT.Client("wss://20.85.158.3:9001/mqtt", 9001, "Santiago");

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