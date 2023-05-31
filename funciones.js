document.addEventListener("DOMContentLoaded", function() {
  var conectarBtn = document.getElementById("conectarBtn");
  conectarBtn.addEventListener("click", conectarArduino);
  cambiarColor();
});

async function conectarArduino() {
  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });

    const reader = port.readable.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decoder = new TextDecoder();
      const receivedData = decoder.decode(value);
      const distancia = parseFloat(receivedData);

      if (!isNaN(distancia)) {
        actualizarDistancia(distancia);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function cambiarColor() {
  console.log("funcionando");

  var lugares = document.querySelectorAll(".lugar");

  lugares.forEach(function(lugar) {
    var distanciaActual = parseFloat(lugar.dataset.distancia);

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

function actualizarDistancia(distancia) {
  var lugares = document.querySelectorAll(".lugar");
  lugares.forEach(function(lugar) {
    lugar.dataset.distancia = distancia;
  });

  cambiarColor();
}