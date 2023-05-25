const midiv = document.querySelector("#lugar");
var distancia = 5;

midiv.addEventListener("click", cambiarcolor);

function cambiarcolor(){
    console.log("funcionando");
if(distancia < 5){
midiv.setAttribute("bgcolor", "red");
}else{
    midiv.setAttribute("bgcolor", "green")
}
}
