function printConclusion(nombre, cong_selected, cont_abs_tot, cont_si_tot, cont_no_tot, cont_asis_tot) {
    var stringpro = nombre

    var reprelevel = 0.0

    var p = ""
  
    //Si mayoria
    if (cont_si_tot > cont_no_tot && cont_si_tot > cont_abs_tot && cont_si_tot > cont_asis_tot) {
      if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_asis_tot) {
        reprelevel = 0.7
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos. Sin embargo, los congresistas votantes decidieron abstenerse en proyectos de ley relacionados en varias ocasiones con <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>  Abstenciones.";
      }
      if (cont_no_tot > cont_abs_tot && cont_no_tot > cont_asis_tot) {
        reprelevel = 0.8
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos. Sin embargo, la segunda mayor votacion corresponde a en contra de proyectos de ley relacionados, con: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos en contra.";
      }
      if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot) {
        reprelevel = 0.5
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos. Sin embargo, el alto número de inasistencias a votaciones podría refleja desinterés político por proyectos de ley relacionados, siendo: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
      }
      if (cont_no_tot == cont_abs_tot && cont_no_tot == cont_asis_tot) {
        reprelevel = 0.8
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja apoyo en general a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, las demás tipos de voto son similares en cantidad.";
      }
    }
    //No mayoria   
    else if (cont_no_tot > cont_asis_tot && cont_no_tot > cont_abs_tot && cont_no_tot > cont_si_tot) {
      if (cont_abs_tot > cont_asis_tot && cont_abs_tot > cont_si_tot) {
        reprelevel = 0.7
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos, adicionalmente, los congresistas votantes decidieron abstenerse en proyectos de ley relacionados en varias ocasiones con <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>  Abstenciones.";
      }
      if (cont_si_tot > cont_abs_tot && cont_si_tot > cont_asis_tot) {
        reprelevel = 0.8
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos. Sin embargo, la segunda mayor votacion corresponde a favor de proyectos de ley relacionados, con: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos.";
      }
      if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot) {
        reprelevel = 0.5
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos, por otra parte, el alto número de inasistencias a votaciones podría refleja desinterés político por proyectos de ley relacionados, siendo: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
      }
      if (cont_si_tot == cont_abs_tot && cont_si_tot == cont_asis_tot) {
        reprelevel = 0.7
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja el no apoyo en general a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, las demás tipos de voto son similares en cantidad.";
      }
    }
    //Inasistencia mayoria   
    else if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot && cont_asis_tot > cont_si_tot) {
      if (cont_si_tot > cont_abs_tot && cont_si_tot > cont_no_tot) {
        reprelevel = 0.4
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico. Sin embargo, participo a favor en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> ocasiones.";
      }
      if (cont_no_tot > cont_abs_tot && cont_no_tot > cont_si_tot) {
        reprelevel = 0.3
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico. Sin embargo, participo en contra en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> ocasiones.";
      }
      if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_si_tot) {
        reprelevel = 0.2
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, adicionalmente, se abstuvo en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark> ocasiones, indicando una baja actividad legislativa.";
      }
      if (cont_si_tot == cont_abs_tot && cont_si_tot == cont_asis_tot) {
        reprelevel = 0.3
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, por otra parte, el resto de votaciones es similar.";
      }
      if (cont_no_tot == cont_abs_tot) {
        reprelevel = 0.2
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, adicionalmente, se abstuvo y voto en contra el mismo numero de veces, en este caso en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark> ocasiones, indicando una baja actividad legislativa.";
      }
    }
    //abs mayoria 
    else if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_si_tot && cont_abs_tot > cont_asis_tot) {
      if (cont_si_tot > cont_asis_tot && cont_si_tot > cont_no_tot) {
        reprelevel = 0.4
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.). Sin embargo, participo a favor en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> ocasiones.";
      }
      if (cont_no_tot > cont_asis_tot && cont_no_tot > cont_si_tot) {
        reprelevel = 0.4
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.). Sin embargo, participo en contra en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> ocasiones.";
      }
      if (cont_asis_tot > cont_si_tot && cont_asis_tot > cont_no_tot) {
        reprelevel = 0.2
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), por otra parte, presenta: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
      }
      if (cont_si_tot == cont_no_tot && cont_si_tot == cont_asis_tot) {
        reprelevel = 0.3
        p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), por otra parte, el resto de votaciones es similar. ";
      }
    }
  
    if (cont_si_tot == 0 && cont_abs_tot == 0 && cont_asis_tot == 0 && cont_no_tot == 0) {
      
      reprelevel = 0.0
      p = "Sin resultados o no se registra actividad legislativa del congresista: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark>  para el tema: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> , Intenta de nuevo la busqueda <i class='far fa-smile-wink'></i>"
    }
  
    if (cont_si_tot > cont_no_tot && cont_abs_tot > cont_no_tot && cont_si_tot == cont_abs_tot && cont_si_tot > cont_asis_tot && cont_abs_tot > cont_asis_tot) {
      reprelevel = 0.5
      p = "El comportamiento de los congresistas: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un comportamiento similar en dos tipos de voto para proyectos de ley relacionados a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo de <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark> abtenciones, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), a pesar de lo anterior,  apoyo estos proyectos el mismo numero de veces que se abstuvo."
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
    iDiv.className = 'mySlides-nm';
    document.getElementById('slidecontainer').appendChild(iDiv);
  
    // console.log(reprelevel)
  
  }

function printConclusionP(nombre, cong_selected, cont_abs_tot, cont_si_tot, cont_no_tot, cont_asis_tot) {
    var stringpro = nombre

    var p = ""
  
    //Si mayoria
    if (cont_si_tot > cont_no_tot && cont_si_tot > cont_abs_tot && cont_si_tot > cont_asis_tot) {
      if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_asis_tot) {
  
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos. Sin embargo, los congresistas votantes decidieron abstenerse en proyectos de ley relacionados en varias ocasiones con <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>  Abstenciones.";
      }
      if (cont_no_tot > cont_abs_tot && cont_no_tot > cont_asis_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos. Sin embargo, la segunda mayor votacion corresponde a en contra de proyectos de ley relacionados, con: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos en contra.";
      }
      if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos. Sin embargo, el alto número de inasistencias a votaciones podría refleja desinterés político por proyectos de ley relacionados, siendo: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
      }
      if (cont_no_tot == cont_abs_tot && cont_no_tot == cont_asis_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja apoyo en general a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo a favor de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, las demás tipos de voto son similares en cantidad.";
      }
    }
    //No mayoria   
    else if (cont_no_tot > cont_asis_tot && cont_no_tot > cont_abs_tot && cont_no_tot > cont_si_tot) {
      if (cont_abs_tot > cont_asis_tot && cont_abs_tot > cont_si_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos, adicionalmente, los congresistas votantes decidieron abstenerse en proyectos de ley relacionados en varias ocasiones con <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>  Abstenciones.";
      }
      if (cont_si_tot > cont_abs_tot && cont_si_tot > cont_asis_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos. Sin embargo, la segunda mayor votacion corresponde a favor de proyectos de ley relacionados, con: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos.";
      }
      if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja el no apoyo a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> votos, por otra parte, el alto número de inasistencias a votaciones podría refleja desinterés político por proyectos de ley relacionados, siendo: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
      }
      if (cont_si_tot == cont_abs_tot && cont_si_tot == cont_asis_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja el no apoyo en general a proyectos de ley sobre los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo en contra de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> votos, las demás tipos de voto son similares en cantidad.";
      }
    }
    //Inasistencia mayoria   
    else if (cont_asis_tot > cont_no_tot && cont_asis_tot > cont_abs_tot && cont_asis_tot > cont_si_tot) {
      if (cont_si_tot > cont_abs_tot && cont_si_tot > cont_no_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico. Sin embargo, participo a favor en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> ocasiones.";
      }
      if (cont_no_tot > cont_abs_tot && cont_no_tot > cont_si_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico. Sin embargo, participo en contra en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> ocasiones.";
      }
      if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_si_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, adicionalmente, se abstuvo en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark> ocasiones, indicando una baja actividad legislativa.";
      }
      if (cont_si_tot == cont_abs_tot && cont_si_tot == cont_asis_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, por otra parte, el resto de votaciones es similar.";
      }
      if (cont_no_tot == cont_abs_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja una ausencia considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un número de inasistencias de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark>, reflejando posible desintéres politico, adicionalmente, se abstuvo y voto en contra el mismo numero de veces, en este caso en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark> ocasiones, indicando una baja actividad legislativa.";
      }
    }
    //abs mayoria 
    else if (cont_abs_tot > cont_no_tot && cont_abs_tot > cont_si_tot && cont_abs_tot > cont_asis_tot) {
      if (cont_si_tot > cont_asis_tot && cont_si_tot > cont_no_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.). Sin embargo, participo a favor en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_si_tot) + "</b></mark> ocasiones.";
      }
      if (cont_no_tot > cont_asis_tot && cont_no_tot > cont_si_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.). Sin embargo, participo en contra en: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_no_tot) + "</b></mark> ocasiones.";
      }
      if (cont_asis_tot > cont_si_tot && cont_asis_tot > cont_no_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), por otra parte, presenta: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_asis_tot) + "</b></mark> inasistencias.";
      }
      if (cont_si_tot == cont_no_tot && cont_si_tot == cont_asis_tot) {
        p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un número de abstenciones considerable en las votaciones de proyectos de ley relacionadas a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un total de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark>, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), por otra parte, el resto de votaciones es similar. ";
      }
    }
  
    if (cont_si_tot == 0 && cont_abs_tot == 0 && cont_asis_tot == 0 && cont_no_tot == 0) {
      p = "Sin resultados o no se registra actividad legislativa para el tema: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> , Intenta de nuevo la busqueda <i class='far fa-smile-wink'></i>"
    }
  
    if (cont_si_tot > cont_no_tot && cont_abs_tot > cont_no_tot && cont_si_tot == cont_abs_tot && cont_si_tot > cont_asis_tot && cont_abs_tot > cont_asis_tot) {
      p = "El comportamiento del partido político: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + cong_selected + "</b></mark> refleja un comportamiento similar en dos tipos de voto para proyectos de ley relacionados a los temas de: <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + stringpro + "</b></mark> con un conteo de <mark style='background-color: #3abae9; color: white; font-size: 20px;'></b>" + String(cont_abs_tot) + "</b></mark> abtenciones, emitiendo un voto neutro que refleja posibles factores (evitar costos políticos, afectar el quórum, entre otros.), a pesar de lo anterior,  apoyo estos proyectos el mismo numero de veces que se abstuvo."
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
    iDiv.className = 'mySlides-nm';
    document.getElementById('slidecontainer').appendChild(iDiv);
  
    // console.log(cont_si_tot)
  
  }