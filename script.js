const MAX_ERRORS = 8;
let errors = 0;
let missingletters = [];
let palabrares = "";
const DEBUGGING = true;
function getRandomWord() {
  return fetch("./Consola/palabras.json")
    .then((res) => {
      return res.json();
    })
    .then((palabras) =>
      palabras[parseInt(Math.random() * palabras.length)].word.toUpperCase()
    );
}
const debug = function (msg) {
  if (DEBUGGING) console.warn(msg);
};

async function startGame() {
  errors = 0;
  const palabra = await getRandomWord();
  missingletters = palabra.split("");

  debug(palabra);
  debug(missingletters);
  document.querySelector("#envio").addEventListener("click", (ev) => {
    let letra = document.querySelector("#letra").value.toUpperCase();
    debug("evento -- " + palabra + "   " + letra);
    checkLetter(palabra, letra);
  });
}
document.querySelector("#nuevojuego").addEventListener("click", () => {
  document.querySelector("#nuevojuego").style.display = "none";
  document.querySelector("#juego").style.display = "block";
  document.querySelector("#howToPlay").style.display = "none";
  document.querySelector("h1").style.display = "none";
  startGame();
});

function checkLetter(palabra, letra) {
  document.querySelector("#letra").value="";
  let resul = document.querySelector("#feedback");
  if (missingletters.includes(letra)) {
    resul.textContent = "La letra " + letra + " --> SI esta en la palabra.";
    for (let i = palabra.length - 1; i >= 0; i--) {
      if (palabra[i] == letra) {
        document.querySelectorAll(".finalLetter")[i].textContent = letra;
        missingletters.splice(missingletters.indexOf(letra), 1);
        debug("letra");
      }
    }
    if (missingletters.length == 0) {
      document.querySelector("input").disabled;
      document
        .querySelector("img")
        .setAttribute("src", "./multimedia/ahorcadowin.png");
      resul.textContent += "\n HA GANADO"; 
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } else {
    resul.textContent = "La letra " + letra + " --> NO esta en la palabra.";
    errors++;
    refreshImg(errors);
    if (MAX_ERRORS == errors) {
      resul.textContent = "DERROTA";
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }
}
function refreshImg(errors) {
  document
    .querySelector("img")
    .setAttribute("src", "./multimedia/ahorcado" + errors + ".png");
  document.querySelector("#fallos").textContent = `Fallos ${errors}/8`;
}
