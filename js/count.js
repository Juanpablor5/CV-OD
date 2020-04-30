var conteo = [];
var temas = []
let csvContent = "data:text/csv;charset=utf-8,";

for (var i = 0; i < 84; i++) {
    conteo.push(0)
}

fetch("data/proyectos.json")
    .then(function (resp){
        return resp.json();
    })
        .then(function (data){
            if(data.length > 0){
                data.forEach((u) => { 

                    var etiquetas = u.column1;
                    var arrayetiquetas = etiquetas.split(',');

                    //console.log(arrayetiquetas);                    
                    for (i in arrayetiquetas){
                        var x = conteo[arrayetiquetas[i]]
                        conteo[arrayetiquetas[i]] = x+1
                    }
                })
                console.log(conteo);
            }
            

}
);

fetch("./data/temas.json")
    .then(function (resp){
        return resp.json();
    })
        .then(function (data){
            if(data.length > 0){
                data.forEach((u) => { 

                    temas.push(u.id)
                })
                console.log(temas);
            }
            

}
);

