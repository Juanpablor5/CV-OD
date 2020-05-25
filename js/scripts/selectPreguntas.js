setTimeout(() => {
  let object = [];
  fetch("data/json/OD/Preguntas.json")
    .then((resp) => resp.json())
    .then((data) => {
      data.preguntas.forEach(pregunta => {
        object.push({ text: pregunta.nombre });
      });
      let select = new SlimSelect({
        select: "#preguntas",
        placeholder: "Preguntas",
        searchPlaceholder: "Buscar preguntas",
        showSearch: true, // shows search field,
        searchingText: "Buscando...",
        searchText: "No se encontró la pregunta",
        closeOnSelect: false,
        data: object,
      });
    });
}, 300);