setTimeout(() => {
  let preguntas = ["Mini"]
  let cadena = "";
  let object = [];
  for (let i = 0; i < preguntas.length; i++) {
    object.push({ text: preguntas[i] });
  }
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
}, 300);