function visualizarBarras (datos, id) {
  let idVid = "#"+id;
  var vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    "data": {
      "values": datos
    },
    mark: 'bar',
    encoding: {
      y: {field: 'Respuestas', type: 'nominal'},
      x: {
        field: 'porcentaje',
        type: 'quantitative',
        axis: {
          title: 'Porcentaje (%) por pregunta'
        }
      }
    }
  };

  // Embed the visualization in the container with id `vis`
  vegaEmbed(idVid, vlSpec);
}