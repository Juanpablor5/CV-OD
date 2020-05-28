setTimeout(() => {
  let object = [];
  fetch("data/json/CV/Congresistas.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.partidos.length; i++) {
        const partido = data.partidos[i];
        object.push({ label: partido.nombre, options: [] });
        if (partido.congresistas.length > 3){
          object[i].options.push({innerHTML: '<div style="border-top: .5px solid #666; border-bottom: .5px solid #666; font-weight: bold;">'+"Todo el partido "+partido.nombre+'</div>',text: "Todo;"+partido.nombre})
        }
        partido.congresistas.forEach((congresista) => {
          object[i].options.push({text: congresista.nombre})
        });
      }
      var select = new SlimSelect({
        select: "#congresistas",
        placeholder: "Congresistas por partido",
        searchPlaceholder: "Buscar congresista",
        showSearch: true, // shows search field,
        searchingText: "Buscando...",
        searchText: "No se encontró el congresista buscado",
        closeOnSelect: false,
        valuesUseText: false,
        data: object,
      });
    });
}, 300);
