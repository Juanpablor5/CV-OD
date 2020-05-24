$("#btn_preguntas").click(function () {

  let preguntas = Array.from(preguntas.selectedOptions).map(
    (option) => option.value
  );

  let aniosEscogidos = Array.from(anios.selectedOptions).map(
    (option) => option.value
  );
});

