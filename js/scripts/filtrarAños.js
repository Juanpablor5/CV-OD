$("#btn_etiquetas, #btn_anios").click(function () {

  document.getElementById("sec_preg").innerHTML = '<select id="preguntas2" multiple class="font"></select> <button id="btn_preguntas" class="btn" style="background-color: #089baa; font-family: "Questrial", serif;">Buscar</button>';

  let preguntasAnio = [];
  let preguntasFinales = [];
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
          for (let i=0; i<aniosEscogidos.length; i++) {
            let anioEscogido = aniosEscogidos[i];
            if (anioEscogido == pregunta[anioEscogido]) {
                otherObj = {año: anioEscogido, codigo: pregunta["codigo"], nombre: pregunta["nombre"], etiqueta: pregunta["categoria"]};
                preguntasAnio.push(otherObj);
                break;
            }
          }
        }
        if (etiquetasSeleccionadas.length > 0) {
          preguntasAnio.forEach(pregunta => {
            let etiqueta = pregunta.etiqueta;
            for (let i=0; i<etiquetasSeleccionadas.length; i++) {
              let etiquetasSeleccionada = etiquetasSeleccionadas[i];
              if (etiquetasSeleccionada === etiqueta) {
                  newObj = {año: pregunta.año, codigo: pregunta.codigo, nombre: pregunta.nombre, etiqueta: etiqueta};
                  preguntasFinales.push(newObj);
                  break;
              }
            }
          });
          llego = true
        }
        if (preguntasFinales.length == 0 && !llego) {
          preguntasAnio.forEach(pregunta => {
            object.push({ text: pregunta.nombre });
          });
        }
        else {
          document.getElementById("sec_preg").innerHTML = '<select id="preguntas2" multiple class="font"></select> <button id="btn_preguntas" class="btn" style="background-color: #089baa; font-family: "Questrial", serif;">Buscar</button>';
          preguntasFinales.forEach(pregunta => {
            object.push({ text: pregunta.nombre });
          });
        }

        let newP = document.createElement("p");
        newP.setAttribute("id", "conteo_preguntas");
        let newContent = document.createTextNode(object.length);
        newP.appendChild(newContent);
        let currentP = document.getElementById("conteo_preguntas");
        currentP.parentNode.replaceChild(newP,currentP);
        console.log(object.length)
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

