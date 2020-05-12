$("#btn_select").click(function () {
  document.getElementById("flr_si").innerHTML =
    '<div id = "svgContent_si" ></div>';
  document.getElementById("flr_no").innerHTML =
    '<div id = "svgContent_no" ></div>';
  document.getElementById("flr_asis").innerHTML =
    '<div id = "svgContent_asis" ></div>';
  document.getElementById("flr_abs").innerHTML =
    '<div id = "svgContent_abs" ></div>';
  let selected = Array.from(etiquetas.selectedOptions).map(
    (option) => option.value
  );
  let temp_eti_id = [];
  let temp_proy_id = [];
  fetch("data/json/CV/Proyectos.json")
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

      var eti_id_arr = [];
      var proy_id_arr = [];
      $.each(temp_eti_id, function (i, el) {
        if ($.inArray(el, eti_id_arr) === -1) eti_id_arr.push(el);
      });
      $.each(temp_proy_id, function (i, el) {
        if ($.inArray(el, proy_id_arr) === -1) proy_id_arr.push(el);
      });

      console.log(eti_id_arr);
      console.log(proy_id_arr);

      let data_si_flwr = [];

      let cont = [];

      let cont_si = 0;
      let cont_no = 0;
      let cont_abs = 0;
      let cont_asis = 0;

      fetch("data/json/CV/Proyectos.json")
        .then((resp) => resp.json())
        .then((data_proy) => {

          for (let c = -100; c < 600; i += 100) {
            let k = c;
            if (c + 200 == 700) c = 469;

            fetch(`data/json/CV/Votos_congresistas/Votos_${k + 101}-${c + 200}.json.json`)
              .then((resp) => resp.json())
              .then((data_vot) => {
                data_vot.congresista.forEach(proyecto => {
                  proy_id_arr.forEach(id_proy => {
                    proyecto.find(id_p => id_p.id == id_proy)
                  });                  
                });
              });
          }
        });
      flower_si(data_si_flwr);

      // let data_si_flwr=[]
      // for (let i = 0; i < selected.length; i++) {
      //   data_si_flwr.push({Tema: selected[i], abs: (i + (i + 1) * 14)})
      // }
      // flower_si(data_si_flwr);
    });
});
