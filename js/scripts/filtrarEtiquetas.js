$("#btn_etiquetas, #btn_anios").click(function () {

  document.getElementById("sec_preg").innerHTML = '<select id="preguntas3" multiple class="font"></select> <button id="btn_preguntas" class="btn" style="background-color: #089baa; font-family: "Questrial", serif;">Buscar</button>';

  let prePreguntas = [];
  let preguntasFinales = [];
  let preguntasPorEtiquetas = [];
  let otherObj = undefined;
  let newObj = undefined;
  let llego = false;

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
          for (let i=0; i<etiquetasSeleccionadas.length; i++) {
            let etiquetasSeleccionada = etiquetasSeleccionadas[i];
            if (etiquetasSeleccionada == pregunta["categoria"]) {
                newObj = {codigo: pregunta["codigo"], nombre: pregunta["nombre"], etiqueta: pregunta["categoria"]};
                preguntasPorEtiquetas.push(newObj);
                break;
            }
          }
        }
        if (aniosEscogidos.length > 0) {
          preguntasPorEtiquetas.forEach(pregunta => {
            let etiqueta = pregunta.etiqueta;
            for (let i=0; i<aniosEscogidos.length; i++) {
              let anioEscogido = aniosEscogidos[i];
              if (anioEscogido == pregunta[anioEscogido]) {
                  otherObj = {año: anioEscogido, codigo: pregunta["codigo"], nombre: pregunta["nombre"], etiqueta: pregunta["categoria"]};
                  preguntasFinales.push(otherObj);
                  break;
              }
            }
          });
          llego = true;
        }
        console.log(preguntasFinales)
        if (preguntasFinales.length == 0 && !llego) {
          preguntasPorEtiquetas.forEach(pregunta => {
            object.push({ text: pregunta.nombre });
          });
        }
        else {
          console.log("Entra")
          document.getElementById("sec_preg").innerHTML = '<select id="preguntas3" multiple class="font"></select> <button id="btn_preguntas" class="btn" style="background-color: #089baa; font-family: "Questrial", serif;">Buscar</button>';
          preguntasFinales.forEach(pregunta => {
            object.push({ text: pregunta.nombre });
          });
        }
        console.log(object)
        let select = new SlimSelect({
          select: "#preguntas3",
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

