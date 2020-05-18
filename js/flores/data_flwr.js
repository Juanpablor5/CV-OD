$("#btn_select, #btn_select1").click(function () {
  document.getElementById("flr_si").innerHTML =
    '<div id = "svgContent_si" ></div>';
  document.getElementById("flr_no").innerHTML =
    '<div id = "svgContent_no" ></div>';
  document.getElementById("flr_abs").innerHTML =
    '<div id = "svgContent_abs" ></div>';
  document.getElementById("flr_asis").innerHTML =
    '<div id = "svgContent_asis" ></div>';
  let eti_selected = Array.from(etiquetas.selectedOptions).map(
    (option) => option.value
  );

  let anio_selected = Array.from(años.selectedOptions).map(
    (option) => option.value
  );

  if (
    anio_selected.length == 0 ||
    anio_selected[0] == "2004" ||
    anio_selected[0] == "2005" ||
    anio_selected[1] == "2005"
  ) {
    anio_selected = [];
    anio_selected.push(
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018"
    );
  }

  let proy_etiq = [];
  let proy_anio = [];
  let proy_fil = { proyecto: [] };

  let flor_si = [];
  let flor_no = [];
  let flor_abs = [];
  let flor_asis = [];

  eti_selected.forEach((seleccionada) => {
    proy_etiq.push({ nombre: seleccionada, proyectos: [] });
  });

  fetch("data/json/CV/Anios.json")
    .then((resp) => resp.json())
    .then((anios) => {
      anio_selected.forEach((anio_selec) => {
        proy_anio.push(
          anios.find((anio) => anio.anio === parseInt(anio_selec)).congresista
        );
      });
      fetch("data/json/CV/Proyectos.json")
        .then((resp) => resp.json())
        .then((proyectos) => {
          let temp_id = [];
          let proy_id = [];
          for (let i = 0; i < proy_anio.length; i++) {
            const element = proy_anio[i];
            element.forEach((congre) => {
              congre.proyecto.forEach((proy) => {
                temp_id.push(proy.id);
              });
            });
          }
          $.each(temp_id, function (i, el) {
            if ($.inArray(el, proy_id) === -1) proy_id.push(el);
          });

          proy_id.forEach((pr_id) => {
            proy_fil.proyecto.push(
              proyectos.proyecto.find((pry) => pry.id === pr_id)
            );
          });
          proy_fil.proyecto.forEach((proyecto) => {
            proyecto.etiquetas.forEach((etiqueta) => {
              proy_etiq.forEach((seleccionada) => {
                if (seleccionada.nombre == etiqueta.nombre) {
                  seleccionada.proyectos.push({
                    id: proyecto.id,
                    votos: [0, 0, 0, 0],
                  });
                }
              });
            });
          });
        });
    })
    .then((_) => {
      fetch(`data/json/CV/Votos_congresistas/Votos_Unido.json`)
        .then((resp) => resp.json())
        .then((data_vot) => {
          proy_etiq.forEach((eti_selec) => {
            let cont_si_tot = 0;
            let cont_no_tot = 0;
            let cont_abs_tot = 0;
            let cont_asis_tot = 0;
            data_vot.congresista.forEach((congresista) => {
              congresista.proyecto.forEach((proyecto) => {
                let cont_si = 0;
                let cont_no = 0;
                let cont_abs = 0;
                let cont_asis = 0;
                eti_selec.proyectos.forEach((proy_selec) => {
                  if (proyecto.id === proy_selec.id) {
                    cont_si += proyecto.voto.si;
                    cont_no += proyecto.voto.no;
                    cont_abs += proyecto.voto.se_abstuvo;
                    cont_asis += proyecto.voto.no_asistio;

                    proy_selec.votos[0] += cont_si;
                    proy_selec.votos[1] += cont_no;
                    proy_selec.votos[2] += cont_abs;
                    proy_selec.votos[3] += cont_asis;
                  }
                });
                cont_si_tot += cont_si;
                cont_no_tot += cont_no;
                cont_abs_tot += cont_abs;
                cont_asis_tot += cont_asis;
              });
            });
            flor_si.push({ Tema: eti_selec.nombre, abs: cont_si_tot });
            flor_no.push({ Tema: eti_selec.nombre, abs: cont_no_tot });
            flor_abs.push({ Tema: eti_selec.nombre, abs: cont_abs_tot });
            flor_asis.push({ Tema: eti_selec.nombre, abs: cont_asis_tot });
          });
        })
        .then((_) => {
          flower_si(flor_si);
          flower_no(flor_no);
          flower_abs(flor_abs);
          flower_asis(flor_asis);
        });
    });
});
