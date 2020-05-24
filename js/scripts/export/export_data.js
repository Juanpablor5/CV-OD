$("#btn_export").click(function () {

  function readTextFile(file, proy_sel, anio_sel, con_sel) {
    // let t0 = performance.now();
    let proy_id=[]
    let export_id=[]
    if (proy_sel.length == 0)
      alert(
        "Para exportar los datos debe haber hecho el filtrado de los mismos con almenos un tema"
      );
    else {
      let temp_id=[]
      proy_sel.forEach(etiqueta => {
        etiqueta.proyectos.forEach(proyecto => {
          temp_id.push(proyecto.id)
        });
      });

      $.each(temp_id, function(i, el){
        if($.inArray(el, proy_id) === -1) proy_id.push(el);
      });
      proy_id.sort(function(a, b){return a-b})

      for (let i = 0; i < proy_id.length; i++) {
        const proyecto = proy_id[i];
        for (let j = 0; j < con_sel.length; j++) {
          const congresista = con_sel[j];
          for (let k = 0; k < anio_sel.length; k++) {
            const anio = anio_sel[k];
            let cadena = anio+','+proyecto+','+congresista;
            export_id.push(cadena)
          }
        }
      }

      let data_export=[]

      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            let id_export_selec = [];
            Papa.parse(allText, {
              header: true,
              preview: 20000,
              complete: function (results) {
                // console.log("Finished:", results.data);
                results.data.forEach(obj_csv => {
                  export_id.forEach(export_id => {
                    if(obj_csv.id_export === export_id){
                      data_export.push(obj_csv)
                    }
                  });
                });
                // console.log(data_export)
                
                Papa.unparse(data_export)


                // let t1 = performance.now();
                // console.log("El proceso de exportación " + (t1 - t0) + " milisegundos.");
              },
            });
          }
        }
      };
      rawFile.send(null);
    }
  }

  readTextFile("data/csv/CV/Datos_export.csv", proy_etiq, anio_selected_export, congre_selec_export);

});
