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

      var count3 = document.getElementById("slidecontainer2").childElementCount;

      for (let index = 0; index < count3; index++) {
        let slide = document.getElementById('slidecontainer2');
        slide.removeChild(slide.firstElementChild);           
      } 

      document.getElementById('textini2').style.visibility = "visible";

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

              var arreglores = [];

              datos.forEach(pregunta => {
                if (pregunta.pregunta == preguntaEscogida) {
                  arreglores.push([pregunta.respuesta, pregunta.total])
                  jsonDatos.push({Respuestas: pregunta.respuesta, porcentaje: pregunta.total})
                }
              });
              visualizarBarras(jsonDatos)
              console.log(arreglores);
              
              printConclusionod(preguntaEscogida, arreglores)
              console.log(preguntaEscogida);
              
              
              

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
function printConclusionod(pregunta, resarray) {
  
 var p = "";

  if (resarray.length == 0){
 
    p = "Sin resultados o no hay datos para la pregunta <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + pregunta + "</b></mark> , Intenta de nuevo la busqueda <i class='far fa-smile-wink'></i>"
    
  }else{
    var numres = resarray.length;
    var indice = 0;
    var i = 0;
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
      p = "el comportamiento de lo ciudadanos demuestra que el <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(numres) + "</b></mark>% Elije la opción: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(res) + "</b></mark> para responder la pregunta: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(pregunta) + "</b></mark>, sin embargo, el <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(resarray[indice+1][1]) + "</b></mark>% escogio la opción: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(resarray[indice+1][0]) + "</b></mark>" ;
    }else{
      p = "el comportamiento de lo ciudadanos demuestra que el <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(numres) + "</b></mark>% Elije la opción: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(res) + "</b></mark> para responder la pregunta: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(pregunta) + "</b></mark>" ;
      console.log(resarray);
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

