setTimeout(() => {
  let cadena = "";
  let object = [];
  fetch("data/json/CV/Etiquetas.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.etiquetas.length; i++) {
        // Para hacer una lista dentro de otra
        // object.push({label: data.etiquetas[i].id, options: [{text: data.etiquetas[i].nombre}]})
        object.push({ text: data.etiquetas[i].nombre });
      }
      var select = new SlimSelect({
        select: "#etiquetas",
        placeholder: "Categorías",
        searchPlaceholder: "Buscar categoría",
        showSearch: true, // shows search field,
        searchingText: "Buscando...",
        searchText: "No se encontró la categoría",
        closeOnSelect: false,
        data: object,
      });
    });
}, 300);
