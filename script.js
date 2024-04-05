
palabra = fetch('./Consola/palabras.json')
    .then(res => {
      return res.json();
    })
    .then(palabras => palabra=(palabras[parseInt(Math.random()*palabras.length)].word));
    
document.querySelector("#nuevojuego").addEventListener("click", ()=>{
    console.log("TUS MUERTOOOOOS");
    document.querySelector("#nuevojuego").style.display="none";
    document.querySelector("#juego").style.display="block";
});
document.querySelector("#letra").addEventListener("keydown", (ev)=>{
    ev.target.value=ev.target.value.toUpperCase();
    console.log(ev.target.value);
});

