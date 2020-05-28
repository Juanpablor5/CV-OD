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
  let divTagSlide = undefined;
  let pTagTitle = undefined;
  let cont = 0;
  let numText = 0;
  let todosDatos = []
  let idVid = 0;
  let contIdVid = 0;

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
                    let anioEscogido = aniosEscogidos[i];
                    let anio = pregunta.anio;
                    if (anio.toString() == anioEscogido.toString()) {
                      prePorcentaje = pregunta.conteo*100/pregunta.total
                      porcentaje = parseInt(prePorcentaje.toString(),10)
                      datos.push({anio: pregunta.anio,pregunta:pregunta.pregunta, respuesta: pregunta.respuesta, total: porcentaje})
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

              numRandom = Math.random() * (9999 - 1) + 1;
              contIdVid =+ parseInt(numRandom,10);
              for (let i = 0; i < aniosEscogidos.length && datos != []; i++) {
                let anioEscogido = aniosEscogidos[i];
                numRandom1 = Math.random() * (99999 - 10000) + 10000;
                contIdVid =+ parseInt(numRandom1,10);
                idVid = "visOD" + contIdVid;

                pTagYear = document.createElement("p");
                pTagYear.className = "anioPreguntaOD";
                let newContent = document.createTextNode(anioEscogido);
                pTagYear.appendChild(newContent);
                document.getElementsByClassName('mySlides')[j].appendChild(pTagYear);

                let visDivTag = document.createElement("div");
                visDivTag.setAttribute("id", idVid.toString());
                document.getElementsByClassName('mySlides')[j].appendChild(visDivTag);

                datos.forEach(pregunta => {
                  if (pregunta.pregunta == preguntaEscogida && pregunta.anio == anioEscogido) {
                    todosDatos.push({Respuestas: pregunta.respuesta, porcentaje: pregunta.total})
                  }
                });
                if (todosDatos.length != 0) {
                  visualizarBarras(todosDatos,idVid)
                  todosDatos = []
                }else {
                  pTagMensaje = document.createElement("p");
                  pTagMensaje.className = "anioPreguntaOD";
                  let newPContent = document.createTextNode("No se encuentran datos para este año");
                  pTagMensaje.appendChild(newPContent);
                  document.getElementsByClassName('mySlides')[j].appendChild(pTagMensaje);
                }
              }

            }

            aTagPrev = document.createElement("a");
            aTagPrev.className = "prev";
            let newPrevContent = document.createTextNode("❮");
            aTagPrev.appendChild(newPrevContent);
            document.getElementById('container').appendChild(aTagPrev);

            aTagNext = document.createElement("a");
            aTagNext.className = "next";
            let newNextContent = document.createTextNode("❯");
            aTagNext.appendChild(newNextContent);
            document.getElementById('container').appendChild(aTagNext);

            $(".prev").on('click', function() {
              plusSlides(-1)
            });
            $(".next").on('click', function() {
              plusSlides(1)
            });
          });
        let elementPrev = document.getElementsByClassName("prev");
        let elementNext = document.getElementsByClassName("next");
        if (elementPrev.document != undefined && elementNext.document != undefined) {
          elementPrev.document.getElementById('container').removeChild(elementPrev);
          elementNext.document.getElementById('container').removeChild(elementNext);
        }
        let slides = document.getElementsByClassName("mySlides");
        document.querySelectorAll('.mySlides').forEach(function(a) {
          a.remove()
        })
    };
  };
});

