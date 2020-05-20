setTimeout(() => {
  let object = [];
  fetch("data/json/CV/Congresistas.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.partidos.length; i++) {
        const partido = data.partidos[i];
        object.push({ label: partido.nombre, options: [] });
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
        data: object,
      });
    });
}, 300);
