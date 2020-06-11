$("#btn_etiquetas, #btn_anios, #btn_congresistas").click(function () {

  document.getElementById("div_flores3").style.display = "block";
  document.getElementById("ant_flwr").style.display = "block";
  document.getElementById("sig_flwr").style.display = "block";

  // let t0 = performance.now()

  let eti_selected = Array.from(etiquetas.selectedOptions).map(
    (option) => option.value
  );

  let anio_selected = Array.from(anios.selectedOptions).map(
    (option) => option.value
  );

  let cong_selected = Array.from(congresistas.selectedOptions).map(
    (option) => option.value
  );

  var element1 = document.getElementById("temasfilter");
  element1.innerHTML = "Temas: " + String(eti_selected);

  if (eti_selected.length > 0) {
    document.getElementById("spinnertemas").style.visibility = "hidden";
    document.getElementById("checktemas").style.visibility = "visible";
  } else {
    document.getElementById("checktemas").style.visibility = "hidden";
    document.getElementById("spinnertemas").style.visibility = "visible";
  }



  var element2 = document.getElementById("aniosfilter");
  element2.innerHTML = "Años: " + String(anio_selected);

  if (anio_selected.length > 0) {
    document.getElementById("spinneranios").style.visibility = "hidden";
    document.getElementById("checkanios").style.visibility = "visible";
  } else {
    document.getElementById("checkanios").style.visibility = "hidden";
    document.getElementById("spinneranios").style.visibility = "visible";
  }



  // let proy_etiq = [];
  proy_etiq = [];
  let cong_anio = [];

  let congre_selec = [];
  congre_selec_export = [];

  let proy_fil = { proyecto: [] };

  let data_flor_total=[[],[],[],[]];

  let data_flor = [];

  fetch("data/json/CV/Congresistas.json")
    .then((resp) => resp.json())
    .then((partidos) => {

      anio_selected_export = []
      congre_selec_export = []
      var element3 = document.getElementById("congresfilter");
      element3.innerHTML = "Congresistas: " + String(cong_selected);

      if (cong_selected.length > 0) {
        document.getElementById("spinnercongr").style.visibility = "hidden";
        document.getElementById("checkcongr").style.visibility = "visible";
      } else {
        document.getElementById("checkcongr").style.visibility = "hidden";
        document.getElementById("spinnercongr").style.visibility = "visible";
      }

      if (
        anio_selected.length == 0) {
        anio_selected = [];
        anio_selected.push("2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018");
        anio_selected_export.push("2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018");
      } else if ((anio_selected[0] == "2004" && anio_selected.length == 1) ||
        (anio_selected[0] == "2005" && anio_selected.length == 1) ||
        (anio_selected[1] == "2005" && anio_selected.length == 2)) {
        no_data = [{ Tema: "No hay datos para los años seleccionados", abs: 0 }]
        flower_si(no_data);
        flower_no(no_data);
        flower_abs(no_data);
        flower_asis(no_data);
        return;
      } else if (anio_selected[0] == "2004" && anio_selected[1] == "2005") {
        let temp_anio = anio_selected;
        anio_selected = []
        for (let i = 2; i < temp_anio.length; i++) {
          const anio = temp_anio[i];
          anio_selected.push(anio)
          anio_selected_export.push(anio)
        }
      } else if ((anio_selected[0] == "2004" && anio_selected.length > 1) || (anio_selected[0] == "2005" && anio_selected.length > 1)) {
        let temp_anio = anio_selected;
        anio_selected = []
        for (let i = 1; i < temp_anio.length; i++) {
          const anio = temp_anio[i];
          anio_selected.push(anio)
          anio_selected_export.push(anio)
        }
      } else if ((anio_selected[1] == "2005" && anio_selected.length > 2)) {
        let temp_anio = anio_selected;
        anio_selected = []
        for (let i = 2; i < temp_anio.length; i++) {
          const anio = temp_anio[i];
          anio_selected.push(anio)
          anio_selected_export.push(anio)
        }
      } else {
        let temp_anio = anio_selected;
        anio_selected = []
        for (let i = 0; i < temp_anio.length; i++) {
          const anio = temp_anio[i];
          anio_selected.push(anio)
          anio_selected_export.push(anio)
        }
      }



      document.getElementById('textini').style.visibility = "visible";

      partidos.partidos.forEach((partido) => {
        if (cong_selected.length > 0) {
          cong_selected.forEach((cong_selected) => {
            let t = partido.congresistas.find(
              (cong) => cong.nombre === cong_selected
            );
            if (typeof t !== "undefined") {
              data_flor.push({
                nombre: t.nombre,
                id_con: t.id,
                proyectos: [],
                temas: []
              });
              congre_selec.push(t.id);
              congre_selec_export.push(t.id);
            }
          });
        } else {
          partido.congresistas.forEach(cong => {
            data_flor.push({
              nombre: cong.nombre,
              id_con: cong.id,
              proyectos: [],
              temas: []
            });
            congre_selec.push(cong.id);
            congre_selec_export.push(cong.id);
          });
        }
      });
    })
    .then((_) => {
      fetch("data/json/CV/Anios.json")
        .then((resp) => resp.json())
        .then((anios) => {

          eti_selected.forEach((seleccionada) => {
            proy_etiq.push({ nombre: seleccionada, proyectos: [] });
            data_flor.forEach(cong_flwr => {
              cong_flwr.temas.push({
                nombre: seleccionada,
                votos: [
                  { Tema: seleccionada, abs: 0 },
                  { Tema: seleccionada, abs: 0 },
                  { Tema: seleccionada, abs: 0 },
                  { Tema: seleccionada, abs: 0 }
                ]
              })
            });
          });

          anio_selected.forEach((anio_selec) => {
            cong_anio.push(anios.find((anio) => anio.anio === parseInt(anio_selec)).congresista);
          });
          fetch("data/json/CV/Proyectos.json")
            .then((resp) => resp.json())
            .then((proyectos) => {
              let temp_id = [];
              let proy_id = [];
              for (let i = 0; i < cong_anio.length; i++) {
                const anio = cong_anio[i];
                anio.forEach((congre) => {
                  congre.proyecto.forEach((proy) => {
                    if (congre_selec.length > 0) {
                      congre_selec.forEach((cong_selec) => {
                        if (cong_selec == congre.id) {
                          congre.proyecto.forEach((proy) => {
                            temp_id.push(proy.id);
                          });
                        }
                      });
                    } else {
                      temp_id.push(proy.id);
                    }
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
                        id: proyecto.id
                      });
                    }
                  });
                });
              });
            })
            .then((_) => {
              fetch(`data/json/CV/Votos_congresistas/Votos_Unido.json`)
                .then((resp) => resp.json())
                .then((data_vot) => {

                  data_flor.forEach(cong_flwr => {
                    proy_etiq.forEach(eti => {
                      let proy_con = data_vot.congresista.find((id) => id.id === cong_flwr.id_con).proyecto
                      proy_con.forEach(proy => {
                        eti.proyectos.forEach(proy_fil => {
                          if (proy_fil.id == proy.id) {
                            cong_flwr.proyectos.push(proy.id)
                            cong_flwr.temas.forEach(tema_flwr => {
                              if (tema_flwr.nombre == eti.nombre) {
                                tema_flwr.votos[0].abs += proy.voto.si
                                tema_flwr.votos[1].abs += proy.voto.no
                                tema_flwr.votos[2].abs += proy.voto.se_abstuvo
                                tema_flwr.votos[3].abs += proy.voto.no_asistio
                              }
                            });
                          }
                        });
                      });

                    });
                    let temp = cong_flwr.proyectos
                    cong_flwr.proyectos = []
                    $.each(temp, function (i, el) {
                      if ($.inArray(el, cong_flwr.proyectos) === -1) cong_flwr.proyectos.push(el);
                    });
                    cong_flwr.proyectos.sort(function (a, b) {
                      return a - b;
                    });
                  });

                  // console.log(JSON.stringify(data_flor))



                  eti_selected.forEach(eti => {
                    let cont_si_tot = 0;
                    let cont_no_tot = 0;
                    let cont_abs_tot = 0;
                    let cont_asis_tot = 0;

                    data_flor.forEach(congresista => {
                      congresista.temas.forEach(tema => {
                        if (tema.nombre == eti) {
                          cont_si_tot += tema.votos[0].abs;
                          cont_no_tot += tema.votos[1].abs;
                          cont_abs_tot += tema.votos[2].abs;
                          cont_asis_tot += tema.votos[3].abs;
                        }
                      });
                    });

                    data_flor_total

                    data_flor_total[0].push({ Tema: eti, abs: cont_si_tot });
                    data_flor_total[1].push({ Tema: eti, abs: cont_no_tot });
                    data_flor_total[2].push({ Tema: eti, abs: cont_abs_tot });
                    data_flor_total[3].push({ Tema: eti, abs: cont_asis_tot });
                  });
                })
                .then((_) => {

                  slide_flores_par("Vista general de los votos", data_flor_total, data_flor, eti_selected);

                  // let t1 = performance.now()
                  // console.log("El proceso de filtrado tardó " + (t1 - t0) + " milisegundos.")


                });
            });
        });
    });
});

function slide_flores_par(titulo, data_flor_total, data_flor, etiquetas) {
  document.getElementById("div_flores").style.display = "none";

  document.getElementById("slidecontiner_flwr").innerHTML = '<div class="slides_flores"> <div id="div_flores2" style="padding-top: 30%; padding-bottom: 30%; padding-right: 10%; padding-left: 10%;"> <p style="font-size: 18px; padding-top: 20px; font-family: \'Questrial\', serif; font-weight: lighter;">Revisa el comportamiento de las votaciones de los <mark style="background-color: #3abae9; color: white; font-size: 20px;"><b>congresistas</b></mark> o <mark style="background-color: #3abae9; color: white; font-size: 20px;"><b>partidos</b></mark> que escogiste con las flechas. </p> </div> </div> ';

  // Si es igual al número total de congresistas
  if (data_flor.length == 669) {
    var iDiv = document.createElement('div');
    let div_flwr = document.createElement("div");
    const i = 0
    div_flwr.innerHTML = '<div class="numbertext_flwr">' + (i + 1) + '/' + 1 + '</div> <div id="div_flores" class="container"> <div> <p style="font-size: 25px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;">' + titulo + '</p> </div> <div class="row"> <div class="col" > <p style="font-size: 15px; font-family: \'Questrial\', serif; font-weight: normal;"> Número de votos a favor: </p> <div id="flr_si' + i + '" > <p style="font-size: 10px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Escoge al menos un tema. </p> </div> </div> <div class="col" > <p style="font-size: 15px; font-family: \'Questrial\', serif; font-weight: normal;"> Número de votos en contra: </p> <div id="flr_no' + i + '" > <p style="font-size: 10px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Escoge al menos un tema. </p> </div> </div> </div> <div class="row"> <div class="col" > <p style="font-size: 15px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Número de Abstenciones: </p> <div id="flr_abs' + i + '" > <p style="font-size: 10px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Escoge al menos un tema. </p> </div> </div> <div class="col" > <p style="font-size: 15px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Número de Inasistencias: </p> <div id="flr_asis' + i + '" > <p style="font-size: 10px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Escoge al menos un tema. </p> </div> </div> </div> </div>';

    iDiv.appendChild(div_flwr)
    iDiv.id = 'slide_flwr';
    iDiv.className = 'slides_flores';
    document.getElementById('slidecontiner_flwr').appendChild(iDiv);

    document.getElementById("flr_si" + i).innerHTML =
      '<div id = "svgContent_si' + i + '" ></div>';
    document.getElementById("flr_no" + i).innerHTML =
      '<div id = "svgContent_no' + i + '" ></div>';
    document.getElementById("flr_abs" + i).innerHTML =
      '<div id = "svgContent_abs' + i + '" ></div>';
    document.getElementById("flr_asis" + i).innerHTML =
      '<div id = "svgContent_asis' + i + '" ></div>';


    flower_si(data_flor_total[0], i);
    flower_no(data_flor_total[1], i);
    flower_abs(data_flor_total[2], i);
    flower_asis(data_flor_total[3], i);

    // console.log(tema);


  } else {
    console.log(JSON.stringify(data_flor))

    for (let i = 0; i < data_flor.length; i++) {
      const congresista = data_flor[i];

      var iDiv = document.createElement('div');
      let div_flwr = document.createElement("div");
      div_flwr.innerHTML = '<div class="numbertext_flwr">' + (i + 1) + '/' + data_flor.length + '</div> <div id="div_flores" class="container"> <div> <p style="font-size: 25px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;">' + congresista.nombre + '</p> </div> <div class="row"> <div class="col" > <p style="font-size: 15px; font-family: \'Questrial\', serif; font-weight: normal;"> Número de votos a favor: </p> <div id="flr_si' + i + '" > <p style="font-size: 10px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Escoge al menos un tema. </p> </div> </div> <div class="col" > <p style="font-size: 15px; font-family: \'Questrial\', serif; font-weight: normal;"> Número de votos en contra: </p> <div id="flr_no' + i + '" > <p style="font-size: 10px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Escoge al menos un tema. </p> </div> </div> </div> <div class="row"> <div class="col" > <p style="font-size: 15px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Número de Abstenciones: </p> <div id="flr_abs' + i + '" > <p style="font-size: 10px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Escoge al menos un tema. </p> </div> </div> <div class="col" > <p style="font-size: 15px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Número de Inasistencias: </p> <div id="flr_asis' + i + '" > <p style="font-size: 10px; padding-top: 10px; font-family: \'Questrial\', serif; font-weight: normal;"> Escoge al menos un tema. </p> </div> </div> </div> </div>';

      iDiv.appendChild(div_flwr)
      iDiv.id = 'slide_flwr';
      iDiv.className = 'slides_flores';
      document.getElementById('slidecontiner_flwr').appendChild(iDiv);

      document.getElementById("flr_si" + i).innerHTML =
        '<div id = "svgContent_si' + i + '" ></div>';
      document.getElementById("flr_no" + i).innerHTML =
        '<div id = "svgContent_no' + i + '" ></div>';
      document.getElementById("flr_abs" + i).innerHTML =
        '<div id = "svgContent_abs' + i + '" ></div>';
      document.getElementById("flr_asis" + i).innerHTML =
        '<div id = "svgContent_asis' + i + '" ></div>';

      let flor_si_slide = []
      let flor_no_slide = []
      let flor_abs_slide = []
      let flor_asis_slide = []

      congresista.temas.forEach(tema => {
        flor_si_slide.push(tema.votos[0]);
        flor_no_slide.push(tema.votos[1]);
        flor_abs_slide.push(tema.votos[2]);
        flor_asis_slide.push(tema.votos[3]);
        // console.log(tema);
        // console.log(congresista.nombre);
        printConclusion(tema.nombre, congresista.nombre, tema.votos[2].abs, tema.votos[0].abs, tema.votos[1].abs, tema.votos[3].abs)
      });

      flower_si(flor_si_slide, i);
      flower_no(flor_no_slide, i);
      flower_abs(flor_abs_slide, i);
      flower_asis(flor_asis_slide, i);

    }
  }
}