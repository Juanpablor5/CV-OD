$("#btn_etiquetas").click(function () {

  document.getElementById("sec_preg").innerHTML = '<select id="preguntas3" multiple class="font"></select> <button id="btn_preguntas" class="btn" style="background-color: #089baa; font-family: "Questrial", serif;">Buscar</button>';

  let prePreguntas = []
  let preguntasFinales = []
  let preguntasPorEtiquetas = []
  let otherObj = undefined
  let newObj = undefined

  let etiquetasSeleccionadas = Array.from(etiquetas.selectedOptions).map(
    (option) => option.value
  );

  let aniosEscogidos = Array.from(anios.selectedOptions).map(
    (option) => option.value
  );


  setTimeout(() => {
    let object = [];
    let neObject = []
    fetch("data/json/OD/preguntas.json")
      .then((resp) => resp.json())
      .then((data) => {
        for (let j = 0; j < data.preguntas.length; j++) {
          let pregunta = data.preguntas[j];
          for (let i=0; i<etiquetasSeleccionadas.length; i++) {
            let etiquetasSeleccionada = etiquetasSeleccionadas[i];
            if (etiquetasSeleccionada == pregunta["categoria"]) {
                newObj = {codigo: pregunta["codigo"], nombre: pregunta["nombre"], etiqueta: pregunta["categoria"]};
                preguntasPorEtiquetas.push(newObj);
                break;
            }
          }
        }
        preguntasPorEtiquetas.forEach(pregunta => {
          neObject.push({ text: pregunta.nombre });
        });
        console.log(neObject)
        let select = new SlimSelect({
          select: "#preguntas3",
          placeholder: "Preguntas",
          searchPlaceholder: "Buscar preguntas",
          showSearch: true, // shows search field,
          searchingText: "Buscando...",
          searchText: "No se encontró la pregunta",
          closeOnSelect: false,
          data: neObject,
        });
      });
  }, 300);
});







