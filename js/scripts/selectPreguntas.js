function mostrarPreguntas(data) {
  setTimeout(() => {
    let object = [];
    for (let i = 0; i < data.length; i++) {
      object.push({ text: data[i].nombre });
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
}