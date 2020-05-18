setTimeout(() => {
  let años = ["2004","2005","2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014","2016","2018"]
  let cadena = "";
  let object = [];
  for (let i = 0; i < años.length; i++) {
    // Para hacer una lista dentro de otra
    // object.push({label: data.etiquetas[i].id, options: [{text: data.etiquetas[i].nombre}]})
    object.push({ text: años[i] });
  }
  let select = new SlimSelect({
    select: "#años",
    placeholder: "Años",
    searchPlaceholder: "Buscar años",
    showSearch: true, // shows search field,
    searchingText: "Buscando...",
    searchText: "No se encontró el año",
    closeOnSelect: false,
    data: object,
  });
}, 300);