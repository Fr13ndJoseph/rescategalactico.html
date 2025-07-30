// Palabras con pistas
var palabras = [
  ["planeta", "Gira alrededor de una estrella"],
  ["astronauta", "Viaja al espacio"],
  ["galaxia", "Conjunto de estrellas"],
  ["ovni", "Objeto volador no identificado"],
  ["cohete", "Se lanza al espacio"]
];

var palabra = "";
var rand;
var oculta = [];
var hueco = document.getElementById("palabra");
var cont = 6;
var btnInicio = document.getElementById("reset");
var alien = document.getElementById("alien");

// Generar palabra al azar
function generaPalabra() {
  rand = Math.floor(Math.random() * palabras.length);
  palabra = palabras[rand][0].toUpperCase();
}

// Pintar guiones
function pintarGuiones(num) {
  oculta = [];
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join(" ");
}

// Generar abecedario
function generaABC(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  for (; i <= j; i++) {
    var letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML +=
      "<button onclick='intento(\"" + letra + "\")' id='" + letra + "'>" + letra + "</button>";
  }
}

// Intento del jugador
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if (palabra.indexOf(letra) != -1) {
    for (var i = 0; i < palabra.length; i++) {
      if (palabra[i] == letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join(" ");
    document.getElementById("acierto").innerHTML = "¡Bien!";
  } else {
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    mostrarAlien();
  }
  compruebaFin();
}

// Mostrar pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Comprobar fin del juego
function compruebaFin() {
  if (oculta.indexOf("_") == -1) {
    document.getElementById("msg-final").innerHTML = "¡Felicidades, ganaste!";
    document.querySelectorAll("#abcdario button").forEach(btn => btn.disabled = true);
  } else if (cont == 0) {
    document.getElementById("msg-final").innerHTML = "GAME OVER";
    document.querySelectorAll("#abcdario button").forEach(btn => btn.disabled = true);
  }
}

// Alien crece según fallos
function mostrarAlien() {
  alien.style.opacity = 1;
  var nuevoTamaño = 80 + (6 - cont) * 20; 
  alien.style.width = nuevoTamaño + "px";
  alien.style.height = nuevoTamaño + "px";
}

// Reiniciar juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a", "z");
  cont = 6;
  document.getElementById("intentos").innerHTML = cont;
  document.getElementById("msg-final").innerHTML = "";
  document.getElementById("acierto").innerHTML = "";
  alien.style.opacity = 0;
  alien.style.width = "80px";
  alien.style.height = "80px";
}

// Iniciar
window.onload = inicio;
