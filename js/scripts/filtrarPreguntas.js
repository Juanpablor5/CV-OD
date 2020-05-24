$("#btn_anios").click(function () {

  document.getElementById("sec_preg").innerHTML = '<select id="preguntas2" multiple class="font"></select> <button id="btn_preguntas" class="btn" style="background-color: #089baa; font-family: "Questrial", serif;">Buscar</button>';

  let botonAños = document.getElementById("btn_anios");
  let botonEtiquetas = document.getElementById("btn_etiquetas");
  let listaAños = document.getElementById("anios");
  let listaEtiquetas = document.getElementById("etiquetas");
  let prePreguntas = []
  let preguntasFinales = []
  let otherObj = undefined

  let etiquetasSeleccionadas = Array.from(etiquetas.selectedOptions).map(
    (option) => option.value
  );

  let aniosEscogidos = Array.from(anios.selectedOptions).map(
    (option) => option.value
  );


  setTimeout(() => {
    let object = [];
    fetch("data/json/OD/preguntas.json")
      .then((resp) => resp.json())
      .then((data) => {
        for (let j = 0; j < data.preguntas.length; j++) {
          let pregunta = data.preguntas[j];
          for (let i=0; i<aniosEscogidos.length; i++) {

            let anioEscogido = aniosEscogidos[i];
            if (anioEscogido == pregunta[anioEscogido]) {
                otherObj = {año: anioEscogido, codigo: pregunta["codigo"], nombre: pregunta["nombre"], etiqueta: pregunta["categoria"]};
                prePreguntas.push(otherObj);
                break;
            }
          }
        }
        prePreguntas.forEach(pregunta => {
          object.push({ text: pregunta.nombre });
        });
        console.log(object)
        let select = new SlimSelect({
          select: "#preguntas2",
          placeholder: "Preguntas",
          searchPlaceholder: "Buscar preguntas",
          showSearch: true, // shows search field,
          searchingText: "Buscando...",
          searchText: "No se encontró la pregunta",
          closeOnSelect: false,
          data: object,
        });
      });
  }, 300);
});

    //console.log(prePreguntas)
    //console.log(prePreguntas.length)

    //console.log(preguntasFinales)




