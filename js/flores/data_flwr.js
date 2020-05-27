$("#btn_etiquetas, #btn_anios, #btn_congresistas").click(function () {
  document.getElementById("flr_si").innerHTML =
    '<div id = "svgContent_si" ></div>';
  document.getElementById("flr_no").innerHTML =
    '<div id = "svgContent_no" ></div>';
  document.getElementById("flr_abs").innerHTML =
    '<div id = "svgContent_abs" ></div>';
  document.getElementById("flr_asis").innerHTML =
    '<div id = "svgContent_asis" ></div>';

  // let t0 = performance.now()

  var childs = 0;

  let eti_selected = Array.from(etiquetas.selectedOptions).map(
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

  let anio_selected = Array.from(anios.selectedOptions).map(
    (option) => option.value
  );

  var element2 = document.getElementById("aniosfilter");
  element2.innerHTML = "Años: " + String(anio_selected);

  if (anio_selected.length > 0) {
    document.getElementById("spinneranios").style.visibility = "hidden";
    document.getElementById("checkanios").style.visibility = "visible";
  } else {
    document.getElementById("checkanios").style.visibility = "hidden";
    document.getElementById("spinneranios").style.visibility = "visible";
  }

  let cong_selected = Array.from(congresistas.selectedOptions).map(
    (option) => option.value
  );

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

  // let proy_etiq = [];
  proy_etiq = [];
  let cong_anio = [];

  let congre_selec = [];
  congre_selec_export = [];

  let proy_fil = { proyecto: [] };

  let flor_si = [];
  let flor_no = [];
  let flor_abs = [];
  let flor_asis = [];

  eti_selected.forEach((seleccionada) => {
    proy_etiq.push({ nombre: seleccionada, proyectos: [] });
  });

  fetch("data/json/CV/Congresistas.json")
    .then((resp) => resp.json())
    .then((partidos) => {
      partidos.partidos.forEach((partido) => {
        cong_selected.forEach((cong_selected) => {
          let t = partido.congresistas.find(
            (cong) => cong.nombre === cong_selected
          );
          if (typeof t !== "undefined") {
            congre_selec.push(t.id);
            congre_selec_export.push(t.id);
          }
        });
      });
    })
    .then((_) => {
      fetch("data/json/CV/Anios.json")
        .then((resp) => resp.json())
        .then((anios) => {
          anio_selected.forEach((anio_selec) => {
            cong_anio.push(
              anios.find((anio) => anio.anio === parseInt(anio_selec))
                .congresista
            );
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
                        id: proyecto.id,
                        votos: [0, 0, 0, 0],
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
                  // console.log(proy_etiq)
                  // alert(JSON.stringify(proy_etiq))
                  let cont_si_tot = 0;
                  let cont_no_tot = 0;
                  let cont_abs_tot = 0;
                  let cont_asis_tot = 0;
                  proy_etiq.forEach((eti_selec) => {

                    data_vot.congresista.forEach((congresista) => {
                      if (congre_selec.length > 0) {
                        congre_selec.forEach(cong_selec => {
                          if (cong_selec == congresista.id) {
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
                          }
                        });
                      } else {
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
                      }



                    });
                    flor_si.push({ Tema: eti_selec.nombre, abs: cont_si_tot });
                    flor_no.push({ Tema: eti_selec.nombre, abs: cont_no_tot });
                    flor_abs.push({ Tema: eti_selec.nombre, abs: cont_abs_tot });
                    flor_asis.push({ Tema: eti_selec.nombre, abs: cont_asis_tot });

                    //resultados
<<<<<<< HEAD
                    // if (childs == 1){
                    //   for (let index = 0; index < count; index++) {
                    //     let slide = document.getElementById('slidecontainer');
                    //     slide.removeChild(slide.lastElementChild);
                    //   }
                    // }
=======
                    /* if (childs == 1){
                      for (let index = 0; index < count; index++) {
                        let slide = document.getElementById('slidecontainer');
                        slide.removeChild(slide.lastElementChild);
                      }
                    } */
>>>>>>> af3d24253036fde0270fbeda07bc8805eeb894f6
                    var count2 = document.getElementById("slidecontainer").childElementCount;
                    console.log(count2)

                    printConclusion(eti_selec.nombre, cong_selected, flor_si, cont_abs_tot, cont_si_tot, cont_no_tot, cont_asis_tot)


                  });


                })
                .then((_) => {
                  flower_si(flor_si);
                  flower_no(flor_no);
                  flower_abs(flor_abs);
                  flower_asis(flor_asis);
                  // let t1 = performance.now()
                  // console.log("El proceso de filtrado tardó " + (t1 - t0) + " milisegundos.")

                });
            });
        });



    });

  childs += 1;

});



function printConclusion(nombre, cong_selected, flor_si, cont_abs_tot, cont_si_tot, cont_no_tot, cont_asis_tot) {
  var stringpro = nombre

  var stringcongr = ""
  cong_selected.forEach(x => {
    if (cong_selected.length == 1) {
      stringcongr += String(x);
    } else if (cong_selected.length == 0) {
      stringcongr += "Todos";
    } else {
      stringcongr += String(x) + ", ";
    }
  });

  var csi = 0
  flor_si.forEach(x => {
    csi += x.abs
  });


  var p = ""

  //Si mayoria
  if (cont_si_tot > cont_no_tot && cont_si_tot > cont_abs_tot && cont_si_tot > cont_asis_tot) {
    if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_asis_tot) {

      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, sin embargo, los congresistas votantes decidieron abstenerse en proyectos de ley relacionados en varias ocasiones con <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>  Abstenciones.";
    }
    if (cont_no_tot > cont_abs_tot && cont_no_tot > cont_asis_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, sin embargo, la segunda mayor votacion corresponde a en contra de proyectos de ley relacionados, con: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos en contra.";
    }
    if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, sin embargo, el alto número de inasistencias a votaciones podría refleja desinterés político por proyectos de ley relacionados, siendo: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
    }
    if (cont_no_tot == cont_abs_tot && cont_no_tot == cont_asis_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja apoyo en general a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, las demás tipos de voto son similares en cantidad.";
    }
  }
  //No mayoria   
  else if (cont_no_tot > cont_asis_tot && cont_no_tot > cont_abs_tot && cont_no_tot > cont_si_tot) {
    if (cont_abs_tot > cont_asis_tot && cont_abs_tot > cont_si_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos, adicionalmente, los congresistas votantes decidieron abstenerse en proyectos de ley relacionados en varias ocasiones con <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>  Abstenciones.";
    }
    if (cont_si_tot > cont_abs_tot && cont_si_tot > cont_asis_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos, sin embargo, la segunda mayor votacion corresponde a favor de proyectos de ley relacionados, con: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos.";
    }
    if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos, por otra parte, el alto número de inasistencias a votaciones podría refleja desinterés político por proyectos de ley relacionados, siendo: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
    }
    if (cont_si_tot == cont_abs_tot && cont_si_tot == cont_asis_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja el no apoyo en general a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, las demás tipos de voto son similares en cantidad.";
    }
  }
  //Inasistencia mayoria   
  else if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot && cont_asis_tot > cont_si_tot) {
    if (cont_si_tot > cont_abs_tot && cont_si_tot > cont_no_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, sin embargo, participo a favor en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> ocasiones.";
    }
    if (cont_no_tot > cont_abs_tot && cont_no_tot > cont_si_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, sin embargo, participo en contra en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> ocasiones.";
    }
    if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_si_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, adicionalmente, se abstuvo en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark> ocasiones, indicando una baja actividad legislativa.";
    }
    if (cont_si_tot == cont_abs_tot && cont_si_tot == cont_asis_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, por otra parte, el resto de votaciones es similar.";
    }
  }
  //abs mayoria 
  else if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_si_tot && cont_abs_tot > cont_asis_tot) {
    if (cont_si_tot > cont_asis_tot && cont_si_tot > cont_no_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), sin embargo, participo a favor en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> ocasiones.";
    }
    if (cont_no_tot > cont_asis_tot && cont_no_tot > cont_si_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), sin embargo, participo en contra en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> ocasiones.";
    }
    if (cont_asis_tot > cont_si_tot && cont_asis_tot > cont_no_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), por otra parte, presenta: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
    }
    if (cont_si_tot == cont_no_tot && cont_si_tot == cont_asis_tot) {
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringcongr + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), por otra parte, el resto de votaciones es similar. ";
    }
  }

  if (cont_si_tot == 0 && cont_abs_tot == 0 && cont_asis_tot == 0 && cont_no_tot == 0) {
    p = "Sin resultados, Intenta de nuevo la busqueda <i class='far fa-smile-wink'></i>"
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
  iDiv.className = 'mySlides';
  document.getElementById('slidecontainer').appendChild(iDiv);

  // console.log(cont_si_tot)

}

