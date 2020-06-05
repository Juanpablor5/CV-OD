$("#btn_con").click(function () {
  document.getElementById("inner_congresistas").innerHTML = `  
  <p style="font-size: 18px; padding-top: 20px; font-family: 'Questrial', serif; font-weight: lighter;">
      Escogiste filtrar por <mark style="background-color: #3abae9; color: white; font-size: 20px;"></b>congresistas</b></mark> 
   </p>
  `;

  document.getElementById("sel_con").style.display = "block";

  let object = [];
  fetch("data/json/CV/Congresistas.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.partidos.length; i++) {
        const partido = data.partidos[i];
        object.push({ label: partido.nombre, options: [] });
        partido.congresistas.forEach((congresista) => {
          object[i].options.push({ text: congresista.nombre })
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
});

$("#btn_par").click(function () {
  document.getElementById("inner_congresistas").innerHTML = `
  <p style="font-size: 18px; padding-top: 20px; font-family: 'Questrial', serif; font-weight: lighter;">
      Escogiste filtrar por <mark style="background-color: #3abae9; color: white; font-size: 20px;"></b>partido</b></mark> 
   </p>
  `;

  document.getElementById("sel_par").style.display = "block";

  let object = [];
  fetch("data/json/CV/Congresistas.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.partidos.length; i++) {
        const partido = data.partidos[i];
        object.push({ text: partido.nombre });
      }
      var select = new SlimSelect({
        select: "#partidos",
        placeholder: "Partidos políticos",
        searchPlaceholder: "Buscar partido",
        showSearch: true, // shows search field,
        searchingText: "Buscando...",
        searchText: "No se encontró el partido buscado",
        closeOnSelect: false,
        valuesUseText: false,
        data: object,
      });
    });
});
