function visualizarBarras (datos, id) {
  let idVid = "#"+id;
  var vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    "description": "Visualización de respuestas por pregunta para los años escogidos",
    "height": 280,
    "config": {
      "axis": {
        "labelFontSize": 14,
        "titleFontSize": 14
      }
    },
    "data": {
      "values": datos
    },
    mark: 'bar',
    encoding: {
      y: {
        field: 'respuesta',
        type: 'nominal',
        "sort": "null",
        axis: {
          title: 'Respuesta'
        }
      },
      x: {
        field: 'porcentaje',
        type: 'quantitative',
        axis: {
          title: 'Porcentaje (%)'
        }
      },
      "color": {"value": "#089baa"}
    }
  };

  // Embed the visualization in the container with id `vis`
  vegaEmbed(idVid, vlSpec);
}



function visualizarPorAños (datos, id, arregloRespuesta, arregloAnios) {
  let idVid = "#"+id;
  // console.log(datos)
  let vlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "description": "Visualización de respuestas por pregunta para cada año",
    "width": 300,
    "height": 280,
    "config": {
      "axis": {
        "labelFontSize": 14,
        "titleFontSize": 14,
      }
    },
    "data": {
      "values": datos
    },
    "mark": {
      "type": "line",
      "point": {
        "filled": false,
        "fill": "white"
      }
    },
    "encoding": {
      "x": {"field": "anio", "type": "nominal", "oneOf": arregloAnios,"axis": {
          "title": "Años"
        }},
      "y": {"field": "porcentaje", "type": "quantitative", "axis": {
          "title": "Porcentaje (%) por año"
        }},
      "color": {"field": "respuesta", "type": "nominal", "oneOf": arregloRespuesta,"axis": {
          "title": "Respuestas",
          "labelFontSize": 14,
          "titleFontSize": 14,
        }}
    }
  };
  vegaEmbed(idVid, vlSpec);
}

function visualizarPorAños1 (datos, id, arregloRespuesta, arregloAnios) {
  let idVid = "#"+id;
  let arregloColores = ["#003666", "#b84592", "#3369e7", "#00aeff", "#050f2c", "#1cc7d0", "#ff4f81", "#ce181e", "#8e43e7", "#009f4d", "#2dde98", "#ff6c5f", "#ffc168"];
  let vlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "description": "Visualización de respuestas por pregunta para cada año",
    "width": 800,
    "height": 280,
    "config": {
      "axis": {
        "labelFontSize": 14,
        "titleFontSize": 14
      }
    },
    "data": {
      "values": datos
    },
    "transform": [
      {
        "filter": {
          "field": "respuesta",
          "oneOf": arregloRespuesta
        }
      },
      {
        "filter": {
          "field": "anio",
          "oneOf": arregloAnios
        }
      }
    ],
    "encoding": {
      "x": {
        "field": "porcentaje",
        "type": "quantitative",
        "axis": {
          "title": "Porcentaje (%) por año"
        }
      },
      "y": {
        "field": "respuesta",
        "type": "nominal",
        "sort": "null",
        "axis": {
          "title": "Respuesta",
          "offset": 5,
          "ticks": false,
          "minExtent": 70,
          "domain": false
        }
      }
    },
    "layer": [
      {
        "mark": "line",
        "encoding": {
          "detail": {
            "field": "respuesta",
            "type": "nominal"
          },
          "color": {"value": "#000000"},
          "size": {"value": 3}
        }
      },
      {
        "mark": {
          "type": "point",
          "filled": true
        },
        "encoding": {
          "color": {
            "field": "anio",
            "type": "ordinal",
            "scale": {
              "domain": arregloAnios,
              "range": arregloColores
            },
            "legend": {
              "title": "Año"
            }
          },
          "size": {"value": 100},
          "opacity": {"value": 1}
        }
      }
    ]
  };
  vegaEmbed(idVid, vlSpec);
}