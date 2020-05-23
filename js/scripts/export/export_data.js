$("#btn_export").click(function () {
  
  let anio_selected = Array.from(anios.selectedOptions).map(
    (option) => option.value
  );

  let cong_selected = Array.from(congresistas.selectedOptions).map(
    (option) => option.value
  );

  function readTextFile(file, proy_etiq) {
    // let t0 = performance.now();

    let proy_id=[]
    if (proy_id.length == 0)
      alert(
        "Para exportar los datos debe haber hecho el filtrado de los mismos con almenos un tema"
      );
    else {
      let temp_id=[]
      proy_etiq.forEach(etiqueta => {
        etiqueta.proyectos.forEach(proyecto => {
          temp_id.push(proyecto.id)
        });
      });

      $.each(temp_id, function(i, el){
        if($.inArray(el, proy_id) === -1) proy_id.push(el);
      });

      // var rawFile = new XMLHttpRequest();
      // let id_export = [];
      // rawFile.open("GET", file, true);
      // rawFile.onreadystatechange = function () {
      //   if (rawFile.readyState === 4) {
      //     if (rawFile.status === 200 || rawFile.status == 0) {
      //       var allText = rawFile.responseText;
      //       let id_export_selec = [];
      //       Papa.parse(allText, {
      //         header: true,
      //         preview: 50000,
      //         complete: function (results) {
      //           // console.log("Finished:", results.data);
      //           results.data.forEach((obj) => {
      //             id_export.push(obj.id_export);
      //           });
      //           console.log(proy_id);
      //           // let t1 = performance.now();
      //           // console.log("El proceso de exportación " + (t1 - t0) + " milisegundos.");
      //         },
      //       });
      //     }
      //   }
      // };
      // rawFile.send(null);


    }
  }

  // readTextFile("data/csv/CV/Datos_export.csv", proy_etiq);

  console.log(proy_etiq)
});
