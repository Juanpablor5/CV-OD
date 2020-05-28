$("#btn_preguntas").click(function () {

  let preguntas = Array.from(preguntas2.selectedOptions).map(
    (option) => option.value
  );
  //console.log(preguntas)

  let todosAnios = ["2004","2005","2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014","2016","2018"]

  let aniosEscogidos = Array.from(anios.selectedOptions).map(
    (option) => option.value
  );

  let etiquetasEscogidas = Array.from(etiquetas.selectedOptions).map(
    (option) => option.value
  );

  //console.log(aniosEscogidos)
  let datos = [];
  let porcentaje = 0;
  let prePorcentaje = 0;
  let conteoAños = 0;
  let todosDatos = [];
  let divTagSlide = undefined;
  let pTagTitle = undefined;
  let slides = undefined;
  let cont = 0;
  let numText = 0;
  let jsonDatos = []
  let obj = new Object();
  let jsonString = "";
  let contador = 0;

  if (preguntas.length == 0) {
    //Indicar que hay que seleccionar una pregunta, año o etiqueta
  }
  else {
    if (aniosEscogidos.length == 0) {
      //Mostrar visualización de las preguntas escogidas y que no incluyen año o etiqueta
    }
    else {

      fetch("data/json/OD/2004-2018.json")
          .then((resp) => resp.json())
          .then((data) => {
            data.forEach(pregunta => {
              for (let j = 0; j < preguntas.length; j++) {
              let preguntaEscogida = preguntas[j];
                if (pregunta.pregunta == preguntaEscogida) {
                  for (let i = 0; i < aniosEscogidos.length; i++) {
                    if (pregunta.anio == aniosEscogidos[i]) {
                      prePorcentaje = pregunta.conteo*100/pregunta.total
                      porcentaje = parseInt(prePorcentaje.toString(),10)
                      datos.push({pregunta:pregunta.pregunta, respuesta: pregunta.respuesta, total: porcentaje})
                    }
                  }
                }
              }
            });
            //console.log(datos)
            for (let j = 0; j < preguntas.length; j++) {
              cont = j + 1
              let preguntaEscogida = preguntas[j];
              divTagSlide = document.createElement('div');
              divTagSlide.className = "mySlides";
              document.getElementById('container').appendChild(divTagSlide);

              //Creación del título
              pTagTitle = document.createElement("p");
              pTagTitle.className = "tituloPreguntaOD";
              let newContent = document.createTextNode(preguntaEscogida);
              pTagTitle.appendChild(newContent);
              document.getElementsByClassName('mySlides')[j].appendChild(pTagTitle);

              //numbertext
              numText = cont + "/" + preguntas.length
              let divTag1 = document.createElement("div");
              divTag1.className = "numbertext";
              let content = document.createTextNode(numText);
              divTag1.appendChild(content);
              document.getElementsByClassName('mySlides')[j].appendChild(divTag1);

              let visDivTag = document.createElement("div");
              visDivTag.setAttribute("id", "visOD");
              document.getElementsByClassName('mySlides')[j].appendChild(visDivTag);

              datos.forEach(pregunta => {
                if (pregunta.pregunta == preguntaEscogida) {
                  jsonDatos.push({Respuestas: pregunta.respuesta, porcentaje: pregunta.porcentaje})
                  /*if (contador != 0){
                    jsonString += ",";
                  }
                  obj.Respuestas = pregunta.respuesta;
                  obj.porcentaje = pregunta.total;
                  jsonString += JSON.stringify(obj);
                  contador += 1;*/
                }
              });
              /*
              contador = 0;
              let otrString = jsonString.trim().toString();
              console.log(otrString)
              jsonDatos = JSON.parse(otrString)*/
              visualizarBarras(jsonDatos)
            }

            $(".prev").on('click', function() {
              plusSlides(-1)
            });
            $(".next").on('click', function() {
              plusSlides(1)
            });
          });
        //visualizarDatosPreguntas(datos)
    };
  };
});

