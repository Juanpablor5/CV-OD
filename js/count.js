var conteo1 = [];
var conteo2 = [];
var conteo3 = [];
var conteo4 = [];
var conteo5 = [];
var temas = [];
var conteoTotal = [];

for (var i = 0; i < 84; i++) {
    conteo1.push(0)
    conteo2.push(0)
    conteo3.push(0)
    conteo4.push(0)
    conteo5.push(0)
}

fetch("data/Votos congresistas/proyectos.json")
    .then(function (resp){
        return resp.json();
    })
        .then(function (data){
            if(data.proyecto.length > 0){
                data.proyecto.forEach((u) => { 

                    var etiquetas = u.etiquetas;

                    etiquetas.forEach((j) => {

                        switch (u.iniciativa) {
                            case "Legislativa":
                                var index = conteo1[j.id]
                                conteo1[j.id] = index+1
                                break;
                            case "Popular":
                                var index = conteo2[j.id]
                                conteo2[j.id] = index+1
                                break;
                        
                            case "Gubernamental":
                                var index = conteo3[j.id]
                                conteo3[j.id] = index+1
                                break;
                        
                            case "Mixta":
                                var index = conteo4[j.id]
                                conteo4[j.id] = index+1
                                break;
                            
                            case "Otras entidades":
                                var index = conteo5[j.id]
                                conteo5[j.id] = index+1
                                break;
                            default:
                                break;
                        }

                        
                    })   
                })
                console.log(conteo1);
                console.log(conteo2);
                console.log(conteo3);
                console.log(conteo4);
                console.log(conteo5);

            }
}
);

fetch("data/temas.json")
    .then(function (resp){
        return resp.json();
    })
        .then(function (data){
            if(data.length > 0){
                data.forEach((u) => { 

                    temas.push(u.id)
                })
                console.log(temas);

                conteoTotal.push(["id","groupid","size"])

                for(let jndex = 0; jndex < temas.length; jndex++)
                {
                    if (conteo1[jndex+1] > 0)
                    {
                        conteoTotal.push([temas[jndex],"1",String(conteo1[jndex+1])])
                    }
                    
                }
                for(let jndex = 0; jndex < temas.length; jndex++)
                {
                    if (conteo2[jndex+1] > 0)
                    {
                    conteoTotal.push([temas[jndex],"2",String(conteo2[jndex+1])])
                    }
                }
                for(let jndex = 0; jndex < temas.length; jndex++)
                {
                    if (conteo3[jndex+1] > 0)
                    {
                    conteoTotal.push([temas[jndex],"3",String(conteo3[jndex+1])])
                    }
                }
                for(let jndex = 0; jndex < temas.length; jndex++)
                {
                    if (conteo4[jndex+1] > 0)
                    {
                    conteoTotal.push([temas[jndex],"4",String(conteo4[jndex+1])])
                    }
                }
                for(let jndex = 0; jndex < temas.length; jndex++)
                {
                    if (conteo5[jndex+1] > 0)
                    {
                    conteoTotal.push([temas[jndex],"5",String(conteo5[jndex+1])])
                    }
                }

                console.log(conteoTotal);

                let csvContent = "data:text/csv;charset=utf-8," 
                + conteoTotal.map(e => e.join(",")).join("\n");

                //var encodedUri = encodeURI(csvContent);
                //window.open(encodedUri);

            }
}
);


