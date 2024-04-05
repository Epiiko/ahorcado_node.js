const palabras = require("./palabras.json");

const COLORS = {
  RESET: "\x1b[0m",
  RED: "\x1b[0;31m",
  BLUE: "\x1b[0;34m",
  YELLOW: "\x1b[0;33m",
  GREEN: "\x1b[0;32m",

  BOLD: "\x1b[1m",
  INVERT: "\x1b[7m",
};
HANGMANPICS = [
  `
        +
        |
        |
        |
        |
        |
  =========`,
  `
  +---+
      |
      |
      |
      |
      |
=========`,
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========

${COLORS.RESET}Si quiere jugar de nuevo pulse 1 /n para salir pulse 0`,
];

const WELCOME_MSG =
  `
${COLORS.GREEN + COLORS.INVERT}` +
  `       JUEGO DEL AHORCADO      ` +
  `${COLORS.RESET}
--------------------MENU---------------------
Elije entre nueva partida o salir del juego
---------------------------------------------
1 --> Jugar partida
0 --> Salir`;

const CHEAT = false;
const MAX_ERRORS = 8;

let palabra = "";
let missingletters = [];
let errors = 0;

const cls = function () {
  process.stdout.write("\x1bc");
};

const debug = function (str) {
  if (CHEAT) console.log(COLORS.RED + str + COLORS.RESET);
};

const showWord = function () {
  let str = "";
  for (letter of palabra) {
    str +=
      (!missingletters.includes(letter)
        ? COLORS.GREEN + ` ${letter} `
        : COLORS.BLUE + " _ ") + COLORS.RESET;
  }
  console.log(str);
};

const drawHangman = function () {
  console.log(COLORS.YELLOW + COLORS.INVERT + HANGMANPICS[errors] + COLORS.RESET);
};

const showStatus = function () {
  drawHangman();
  console.log(
    COLORS.RED +
      "Lleva " +
      errors +
      " / " +
      MAX_ERRORS +
      " errores" +
      COLORS.RESET
  );
};

const chooseOption = (stream) => {
  let data = stream.toString().trim();
  cls();
  if (data == "0") {
    console.log("Hasta luego gracias por jugar!");
    process.exit();
  } else if (data == "1") {
    errors = 0;
    console.log(
      `${
        COLORS.YELLOW + COLORS.INVERT
      }----------------------------------------------------------------` +
        `${COLORS.RESET}
    BIENVENIDO A SU PARTIDA
    `
    );

    palabra =
      palabras[parseInt(Math.random() * palabras.length)].word.toUpperCase();

    missingletters = palabra.split("");
    console.log(
      "Su palabra es " +
        COLORS.BLUE +
        COLORS.INVERT +
        " _ ".repeat(palabra.length) +
        COLORS.RESET
    );
    console.log("Escribe una letra para comprobar");
    process.stdin.on("data", chooseLetter);
    process.stdin.off("data", chooseOption);
  } else {
    console.log("Error en el numero de opción");
  }
};
const chooseLetter = (stream) => {
  let data = stream.toString().trim().toUpperCase();
  cls();
  debug(palabra); //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO DEBUG PA LOS CHETOS

  if (missingletters.includes(data)) {
    showStatus();
    console.log("aciertooooo!");
    missingletters = missingletters.filter((a) => a != data);
    if (missingletters.length == 0) {
      cls();
      console.log(COLORS.YELLOW + "SE ACABO HA GANADO" + COLORS.RESET);
      console.log(COLORS.GREEN + COLORS.INVERT + palabra + COLORS.RESET);
      console.log("Si quiere jugar de nuevo pulse 1 \n para salir pulse 0");
      process.stdin.off("data", chooseLetter);
      process.stdin.on("data", chooseOption);
    }
  } else {
    console.log("HA FALLADO");
    errors++;
    showStatus();
    if (errors == MAX_ERRORS) {
      console.log(
        COLORS.RED + COLORS.INVERT + " HA PERDIDO LA PARTIDA " + COLORS.RESET
      );
      process.stdin.off("data", chooseLetter);
      process.stdin.on("data", chooseOption);
    } else {
      console.log("Introduzca una letra");
    }
  }
  showWord();
};

process.stdin.on("data", chooseOption);
cls();
console.log(WELCOME_MSG);
