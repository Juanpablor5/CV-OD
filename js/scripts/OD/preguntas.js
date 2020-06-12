$("#btn_preguntas").click(function () {

  //console.log(preguntas)

  let todosLosAnios = ["2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2016", "2018"]

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
  let totalDatos = [];
  let totalAnios = [];
  let divTagSlide = undefined;
  let pTagTitle = undefined;
  let cont = 0;
  let numText = 0;
  let arregloRespuesta = [];
  let arregloAnios = [];
  let preguntas = []
  let preg= document.getElementById("preguntas")

  if (aniosEscogidos.length == 0) {
    //Mostrar visualización de las preguntas escogidas y que no incluyen año o etiqueta
    if (preg != null) {
        preguntas = Array.from(preg.selectedOptions).map(
        (option) => option.value
      );
    }
    else {
      preguntas = Array.from(preguntas2.selectedOptions).map(
        (option) => option.value
      );
    }

    var count3 = document.getElementById("slidecontainer2").childElementCount;

    for (let index = 0; index < count3; index++) {
      let slide = document.getElementById('slidecontainer2');
      slide.removeChild(slide.firstElementChild);
    }

    document.getElementById('textini2').style.visibility = "visible";

    if (preguntas.length >= 1) {

      let prePreg = document.getElementsByClassName("pre-preguntas");
        document.querySelectorAll('.pre-preguntas').forEach(function (a) {
        a.remove()
      })
    }
    fetch("data/json/OD/2004-2018.json")
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach(pregunta => {
          for (let j = 0; j < preguntas.length; j++) {
            let preguntaEscogida = preguntas[j];
            if (pregunta.pregunta.toString().trim() == preguntaEscogida.toString().trim()) {
              for (let i = 0; i < todosLosAnios.length; i++) {
                let anioEscogido = todosLosAnios[i];
                let anio = pregunta.anio;
                if (anio.toString().trim() == anioEscogido.toString().trim()) {
                  prePorcentaje = pregunta.conteo * 100 / pregunta.total
                  porcentaje = parseInt(prePorcentaje.toString(), 10)
                  datos.push({ anio: pregunta.anio, pregunta: pregunta.pregunta, respuesta: pregunta.respuesta, total: porcentaje })
                }
              }
            }
          }
        });
        for (let j = 0; j < preguntas.length; j++) {
          cont = j + 1
          totalAnios = [];
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

          numRandom = Math.random() * (99999 - 1) + 1;
          contIdVid = + parseInt(numRandom, 10);
          idVid = "visOD" + contIdVid;

          if (todosLosAnios.length == 1) {
            pTagYear = document.createElement("p");
            pTagYear.className = "anioPreguntaOD";
            let newContent = document.createTextNode(todosLosAnios[0]);
            pTagYear.appendChild(newContent);
            document.getElementsByClassName('mySlides')[j].appendChild(pTagYear);
          }

          let visDivTag = document.createElement("div");
          visDivTag.setAttribute("id", idVid.toString());
          document.getElementsByClassName('mySlides')[j].appendChild(visDivTag);
          for (let i = 0; i < todosLosAnios.length && datos != []; i++) {
            let anioEscogido = todosLosAnios[i];

            if (todosLosAnios.length > 1) {
              arregloAnios.push(anioEscogido)
              datos.forEach(pregunta => {
                if (pregunta.pregunta == preguntaEscogida && pregunta.anio == anioEscogido) {
                  totalAnios.push({anio: pregunta.anio, respuesta: pregunta.respuesta, porcentaje: pregunta.total });
                  arregloRespuesta.push((pregunta.respuesta).toString());
                }
              });
              visualizarPorAños (totalAnios, idVid, arregloRespuesta, arregloAnios);
            }
            else {

              datos.forEach(pregunta => {
                if (pregunta.pregunta == preguntaEscogida && pregunta.anio == anioEscogido) {
                  let respuestaString = (pregunta.respuesta).toString();
                  totalDatos.push({ respuesta: respuestaString, porcentaje: pregunta.total })
                }
              });
              visualizarBarras(totalDatos, idVid)
              totalDatos = [];
            }

          }
          var arreglores = [];

          datos.forEach(pregunta => {
            if (pregunta.pregunta == preguntaEscogida) {
              arreglores.push([pregunta.respuesta, pregunta.total])
            }
          });

          printConclusionod(preguntaEscogida, arreglores)
        }
        if (preguntas.length > 1) {
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

          $(".prev").on('click', function () {
            plusSlides(-1)
          });
          $(".next").on('click', function () {
            plusSlides(1)
          });
        }

      });
    let elementPrev = document.getElementsByClassName("prev");
    let elementNext = document.getElementsByClassName("next");
    if (elementPrev.document != undefined && elementNext.document != undefined) {
      elementPrev.document.getElementById('container').removeChild(elementPrev);
      elementNext.document.getElementById('container').removeChild(elementNext);
    }
    let slides = document.getElementsByClassName("mySlides");
    document.querySelectorAll('.mySlides').forEach(function (a) {
      a.remove()
    })

  }
  else {
    preguntas = Array.from(preguntas2.selectedOptions).map(
      (option) => option.value
    );
    var count3 = document.getElementById("slidecontainer2").childElementCount;

    for (let index = 0; index < count3; index++) {
      let slide = document.getElementById('slidecontainer2');
      slide.removeChild(slide.firstElementChild);
    }

    document.getElementById('textini2').style.visibility = "visible";

    if (preguntas.length >= 1) {

      let prePreg = document.getElementsByClassName("pre-preguntas");
        document.querySelectorAll('.pre-preguntas').forEach(function (a) {
        a.remove()
      })
    }

    fetch("data/json/OD/2004-2018.json")
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach(pregunta => {
          for (let j = 0; j < preguntas.length; j++) {
            let preguntaEscogida = preguntas[j];
            if (pregunta.pregunta.toString().trim() == preguntaEscogida.toString().trim()) {
              for (let i = 0; i < aniosEscogidos.length; i++) {
                let anioEscogido = aniosEscogidos[i];
                let anio = pregunta.anio;
                if (anio.toString().trim() == anioEscogido.toString().trim()) {
                  prePorcentaje = pregunta.conteo * 100 / pregunta.total
                  porcentaje = parseInt(prePorcentaje.toString(), 10)
                  datos.push({ anio: pregunta.anio, pregunta: pregunta.pregunta, respuesta: pregunta.respuesta, total: porcentaje })
                }
              }
            }
          }
        });
        for (let j = 0; j < preguntas.length; j++) {
          cont = j + 1
          totalAnios = [];
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

          numRandom = Math.random() * (99999 - 1) + 1;
          contIdVid = + parseInt(numRandom, 10);
          idVid = "visOD" + contIdVid;

          if (aniosEscogidos.length == 1) {
            pTagYear = document.createElement("p");
            pTagYear.className = "anioPreguntaOD";
            let newContent = document.createTextNode(aniosEscogidos[0]);
            pTagYear.appendChild(newContent);
            document.getElementsByClassName('mySlides')[j].appendChild(pTagYear);
          }

          let visDivTag = document.createElement("div");
          visDivTag.setAttribute("id", idVid.toString());
          document.getElementsByClassName('mySlides')[j].appendChild(visDivTag);
          for (let i = 0; i < aniosEscogidos.length && datos != []; i++) {
            let anioEscogido = aniosEscogidos[i];

            if (aniosEscogidos.length > 1) {
              arregloAnios.push(anioEscogido)
              datos.forEach(pregunta => {
                if (pregunta.pregunta == preguntaEscogida && pregunta.anio == anioEscogido) {
                  totalAnios.push({anio: pregunta.anio, respuesta: pregunta.respuesta, porcentaje: pregunta.total });
                  arregloRespuesta.push((pregunta.respuesta).toString());
                }
              });
              visualizarPorAños (totalAnios, idVid, arregloRespuesta, arregloAnios);
            }
            else {

              datos.forEach(pregunta => {
                if (pregunta.pregunta == preguntaEscogida && pregunta.anio == anioEscogido) {
                  let respuestaString = (pregunta.respuesta).toString();
                  totalDatos.push({ respuesta: respuestaString, porcentaje: pregunta.total })
                }
              });
              visualizarBarras(totalDatos, idVid)
              totalDatos = [];
            }

          }
          var arreglores = [];

          datos.forEach(pregunta => {
            if (pregunta.pregunta == preguntaEscogida) {
              arreglores.push([pregunta.respuesta, pregunta.total])
            }
          });

          printConclusionod(preguntaEscogida, arreglores)
        }
        if (preguntas.length > 1) {
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

          $(".prev").on('click', function () {
            plusSlides(-1)
          });
          $(".next").on('click', function () {
            plusSlides(1)
          });
        }

      });
    let elementPrev = document.getElementsByClassName("prev");
    let elementNext = document.getElementsByClassName("next");
    if (elementPrev.document != undefined && elementNext.document != undefined) {
      elementPrev.document.getElementById('container').removeChild(elementPrev);
      elementNext.document.getElementById('container').removeChild(elementNext);
    }
    let slides = document.getElementsByClassName("mySlides");
    document.querySelectorAll('.mySlides').forEach(function (a) {
      a.remove()
    })
  };
});
function printConclusionod(pregunta, resarray) {

  var p = "";

  if (resarray.length == 0) {

    p = "Sin resultados o no hay datos para la pregunta <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + pregunta + "</b></mark> , Intenta de nuevo la busqueda <i class='far fa-smile-wink'></i>"

  } else {
    var numres = resarray.length;
    var indice = 0;
    var i = 0;
    console.log(resarray)
    for (let index = 0; index < resarray.length; index++) {
      var porcentaje = resarray[index][1]
      if (porcentaje > i) {
        i = porcentaje
        indice = index
      }
    }

    numres = resarray[indice][1]
    var res = resarray[indice][0]

    if (numres < 50) {
      p = "el comportamiento de lo ciudadanos muestra que el <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + String(numres) + "</b></mark>% Elije la opción: <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + String(res) + "</b></mark> para responder la pregunta: <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + String(pregunta) + "</b></mark>, sin embargo, el <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + String(resarray[0][indice]) + "</b></mark>% escogio la opción: <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + String(resarray[0][indice]) + "</b></mark>";
    } else {
      p = "el comportamiento de lo ciudadanos muestra que el <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + String(numres) + "</b></mark>% Elije la opción: <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + String(res) + "</b></mark> para responder la pregunta: <mark style='background-color: #089baa; color: white; font-size: 20px;'></b>" + String(pregunta) + "</b></mark>";
      // console.log(resarray);
    }


  }

  var iDiv = document.createElement('div');
  var parrafo = document.createElement("p");
  parrafo.style.fontSize = '18px';
  parrafo.style.paddingTop = '10px';
  parrafo.style.fontFamily = 'Questrial, serif';
  parrafo.style.fontWeight = 'lighter';
  parrafo.innerHTML = p
  iDiv.appendChild(parrafo)
  iDiv.id = 'slide';
  iDiv.className = 'mySlides-nm2';
  document.getElementById('slidecontainer2').appendChild(iDiv);

}