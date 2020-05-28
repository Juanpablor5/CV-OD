$("#btn_export").click(function () {

  function readTextFile(file, proy_sel, anio_sel, con_sel) {
    let t0 = performance.now();
    let proy_id = []
    let export_id = []

    if(proy_sel.length==0){
      document.body.className=""
      alert("Para exportar los datos debe haber realizado el filtrado de los mismos antes")
    } else if (con_sel.length==0 && anio_sel.length==13){
      document.body.className=""
      alert(
        "Para un mejor rendimiento al exportar los datos, debe realizar el filtrado de los proyectos con almenos un año o congresista, y la categoría.\r\n\r\nPor ejemplo: 2015 y Economía o Cualquier congresista y Economía"
      );}
    else if(anio_sel.length>3 && con_sel.length==0){
      document.body.className=""
      alert("Para un mejor rendimiento al exportar los datos, por favor seleccione máximo 3 años o agregue un congresista al filtrado")
    } else{
      if(con_sel.length==0 && anio_sel.length>0 && anio_sel.length<13){
        for (let i = 0; i < 669; i++) {
          con_sel.push(i);
        }
      }

      let temp_id = []
      proy_sel.forEach(etiqueta => {
        etiqueta.proyectos.forEach(proyecto => {
          temp_id.push(proyecto.id)
        });
      });

      $.each(temp_id, function (i, el) {
        if ($.inArray(el, proy_id) === -1) proy_id.push(el);
      });
      proy_id.sort(function (a, b) { return a - b })

      for (let i = 0; i < proy_id.length; i++) {
        const proyecto = proy_id[i];
        for (let j = 0; j < con_sel.length; j++) {
          const congresista = con_sel[j];
          for (let k = 0; k < anio_sel.length; k++) {
            const anio = anio_sel[k];
            let cadena = anio + ',' + proyecto + ',' + congresista;
            export_id.push(cadena)
          }
        }
      }

      // console.log(export_id)
      if(export_id.length>2000){
        alert("Debido a la gran cantidad de datos filtrados, el proceso de exportación de los mismos puede tardar un rato. Por favor espere hasta que se haya descargado el archivo")
      }

      let data_export = []

      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            let id_export_selec = [];
            Papa.parse(allText, {
              header: true,
              complete: function (results) {
                // console.log("Finished:", results.data);
                results.data.forEach(obj_csv => {
                  export_id.forEach(export_id => {
                    if (obj_csv.id_export === export_id) {
                      data_export.push(obj_csv)
                    }
                  });
                });
                // console.log(results)

                let csv_export = Papa.unparse(data_export, {
                  delimiter: ";",
                  header: true
                });
                // console.log(csv_export)
                document.body.className=""
                let blob = new Blob([csv_export], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "data_export.csv");

                let t1 = performance.now();
                console.log("El proceso de exportación tardó " + (t1 - t0)/1000 + " segundos.");
              },
            });
          }
        }
      };
      rawFile.send(null);
    }
  }

  document.body.className = "loading-gif";
  readTextFile("data/csv/CV/Datos_export.csv", proy_etiq, anio_selected_export, congre_selec_export);

});
