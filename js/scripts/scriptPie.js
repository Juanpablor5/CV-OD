/*let botonAños = document.getElementById("btn_anios");
let listaAños = document.getElementById("anios");
let listaPreguntas = document.getElementById("anios");
let listaEtiquetas = document.getElementById("preguntas");
let preguntas = []
let preguntalesFinales = []
let códigos = []
let cont = 0

botonAños.addEventListener("click", function() {
  let aniosEscogidos = listaAños.selectedOptions;
  let preguntasEscogidas = listaAños.selectedOptions;


  fetch("data/json/OD/Preguntas.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let j = 0; j < data.preguntas.length; j++) {
        let pregunta = data.preguntas[j];
        for (let i=0; i<preguntasEscogidas.length; i++) {
          let preNombre = preguntasEscogidas[i];
          let nombre = preNombre.value.toString();

          if (nombre == pregunta.nombre) {
            códigos.push(pregunta.código)
          }
        }

      }



  });

  fetch("data/json/OD/2004-2018.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let j = 0; j < data.respuestas.length; j++) {
        let respuesta = data.respuestas[j];
        for (let i=0; i<aniosEscogidos.length; i++) {

          let miAnio = aniosEscogidos[i];
          let elAnio = miAnio.value.toString();
          if (respuesta.año === elAnio) {

          }
        }

      }
    });
/*



  setTimeout(() => {
    let object = [];
    for (let i = 0; i < preguntas.length; i++) {
      object.push({ text: preguntas[i].pregunta });
    }
    let select = new SlimSelect({
      select: "#preguntas",
      placeholder: "Preguntas",
      searchPlaceholder: "Buscar preguntas",
      showSearch: true, // shows search field,
      searchingText: "Buscando...",
      searchText: "No se encontró la pregunta",
      closeOnSelect: false,
      data: object,
    });
  }, 300);
}, false);
*/

