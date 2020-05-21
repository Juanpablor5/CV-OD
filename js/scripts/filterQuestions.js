let botonAños = document.getElementById("btn_anios");
let botonEtiquetas = document.getElementById("btn_etiquetas");
let listaAños = document.getElementById("anios");
let listaEtiquetas = document.getElementById("etiquetas");
let preguntas = []
let preguntalesFinales = []
let cont = 0

botonAños.addEventListener("click", function() {
  let aniosEscogidos = listaAños.selectedOptions;

  fetch("data/json/OD/añosPreguntasNum.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let j = 0; j < data.preguntas.length; j++) {
        let pregunta = data.preguntas[j];
        cont = 0;

        a2004 = pregunta["2004"];
        año2004 = a2004.toString();
        a2005 = pregunta["2005"];
        año2005 = a2005.toString();
        a2006 = pregunta["2006"];
        año2006 = a2006.toString();
        a2007 = pregunta["2007"];
        año2007 = a2007.toString();
        a2008 = pregunta["2008"];
        año2008 = a2008.toString();
        a2009 = pregunta["2009"];
        año2009 = a2009.toString();
        a2010 = pregunta["2010"];
        año2010 = a2010.toString();
        a2011 = pregunta["2011"];
        año2011 = a2011.toString();
        a2012 = pregunta["2012"];
        año2012 = a2012.toString();
        a2013 = pregunta["2013"];
        año2013 = a2013.toString();
        a2014 = pregunta["2014"];
        año2014 = a2014.toString();
        a2016 = pregunta["2016"];
        año2016 = a2016.toString();
        a2018 = pregunta["2018"];
        año2018 = a2018.toString();


        for (let i=0; i<aniosEscogidos.length; i++) {

          let miAnio = aniosEscogidos[i];
          let elAnio = miAnio.value.toString();

          if (elAnio == "2004" && año2004 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2005" && año2005 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2006" && año2006 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2007" && año2007 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2008" && año2008 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2009" && año2009 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2010" && año2010 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2011" && año2011 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2012" && año2012 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2013" && año2013 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2014" && año2014 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2016" && año2016 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
          } else if (elAnio == "2018" && año2018 == "1") {
            preguntas.push({ pregunta: pregunta["Labels"], etiqueta: pregunta["Subcategoría"] });
            break;
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
  }, 300);*/
}, false);



botonEtiquetas.addEventListener("click", function() {
  let etiquetasEscogidas = listaEtiquetas.selectedOptions;

  for (let j = 0; j < preguntas.length; j++) {
    let nombre = preguntas[j].pregunta;
    let etiqueta = preguntas[j].etiqueta.toString();


    for (let i=0; i<etiquetasEscogidas.length; i++) {
      let miEtiqueta = etiquetasEscogidas[i];
      let laEtiqueta = miEtiqueta.value.toString();

      if (etiqueta === laEtiqueta) {
        preguntalesFinales.push({ nombre: nombre });
      }

    }
  }

  setTimeout(() => {
    let object = [];
    for (let i = 0; i < preguntalesFinales.length; i++) {
      object.push({ text: preguntalesFinales[i].nombre });
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