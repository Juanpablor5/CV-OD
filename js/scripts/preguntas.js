let años = ["2004","2005","2006", "2007", "2008", "2009", "2010", "2011", "2012","2013","2014","2016","2018"]
$("#btn_preguntas").click(function () {

  let preguntas = Array.from(preguntas2.selectedOptions).map(
    (option) => option.value
  );
  console.log(preguntas)

  let aniosEscogidos = Array.from(anios.selectedOptions).map(
    (option) => option.value
  );

  let etiquetasEscogidas = Array.from(etiquetas.selectedOptions).map(
    (option) => option.value
  );

  console.log(aniosEscogidos)

  if (preguntas.length == 0) {
    //Indicar que hay que seleccionar una pregunta, año o etiqueta
  }
  else {
    if (aniosEscogidos.length == 0 && etiquetasEscogidas == 0) {
      //Mostrar visualización de las preguntas escogidas y que no incluyen año o etiqueta
    }
    else {
      if (aniosEscogidos.length == 0) {
        //Mostrar visualización de todos los años
      }
      else {
        //Mostrar visualización de acuerdo a los años escogidos
        fetch("data/json/OD/2004-2018.json")
            .then((resp) => resp.json())
            .then((data) => {
              for (let i = 0; i < data.respuestas.length; i++) {

                for (let j = 0; j < aniosEscogidos.length; j++) {

                }
              }

            });
      }

    }
  }




});

