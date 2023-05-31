document.addEventListener("DOMContentLoaded", cambiarcolor);

function cambiarcolor() {
  console.log("funcionando");

  var lugares = document.querySelectorAll(".lugar");

  lugares.forEach(function(lugar) {
    var distanciaActual = parseFloat(lugar.dataset.distancia); // Accede al atributo de datos 'distancia' y conviértelo a número

    
    lugar.style.backgroundRepeat = "no-repeat";
    lugar.style.backgroundPosition = "center center";
    
    if (distanciaActual <= 5) {
        lugar.classList.add("distancia-menor-h2");
        lugar.style.backgroundImage = "url('pngegg.png')";
        lugar.querySelector("h2").style.display = "none";
    } else {
        lugar.classList.remove("distancia-menor-h2");
      lugar.setAttribute("style", "background-color: green;");
      lugar.querySelector("h2").style.display = "block";
    }
  });
}