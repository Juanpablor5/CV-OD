$("#btn_select").click(function () {
  document.getElementById("flr_si").innerHTML =
    '<div id = "svgContent" ></div>';
  let selected = Array.from(etiquetas.selectedOptions).map(
    (option) => option.value
  );
  let temp_eti_id = [];
  let temp_proy_id = [];
  fetch("data/json/Proyectos.json")
    .then((resp) => resp.json())
    .then((data) => {
      data.proyecto.forEach((proyecto) => {
        proyecto.etiquetas.forEach((etiqueta) => {
          selected.forEach((seleccionada) => {
            if (seleccionada == etiqueta.nombre) {
              temp_eti_id.push(etiqueta.id);
              temp_proy_id.push(proyecto.id);
            }
          });
        });
      });

      var eti_id = [];
      var proy_id = [];
      $.each(temp_eti_id, function (i, el) {
        if ($.inArray(el, eti_id) === -1) eti_id.push(el);
      });
      $.each(temp_proy_id, function (i, el) {
        if ($.inArray(el, proy_id) === -1) proy_id.push(el);
      });

      let data_si_flwr = [];

      fetch("data/json/Proyectos.json")
        .then((resp) => resp.json())
        .then((data) => {
          
        });
      
      // let data_si_flwr=[]
      // for (let i = 0; i < selected.length; i++) {
      //   data_si_flwr.push({Tema: selected[i], abs: (i + (i + 1) * 14)})
      // }
      // flower_si(data_si_flwr);
    });
});
