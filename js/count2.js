var conteo = [];
var conteoA = [];
var conteoB = [];
var conteoC = [];
var conteoD = [];
var conteoE = [];
var temas2 = [];
var conteoTotalCt = [];

for (var i = 0; i < 272; i++) {
    conteo.push(false)
    conteoA.push(0)
    conteoB.push(0)
    conteoC.push(0)
    conteoD.push(0)
    conteoE.push(0)
}

fetch("data/Cuatrenios/2014-2018.json")
    .then(function (resp){
        return resp.json();
    })
        .then(function (data){
            if(data.congresista.length > 0){
                data.congresista.forEach((u) => { 

                    var proyectos = u.proyecto;

                    proyectos.forEach((i) => {

                        var index = conteo[i.id]
                        if (index == false){
                            conteo[i.id] = true
                        }
                    })  
                    
                })
                

                for (let index = 0; index < conteo.length; index++) {
                    
                    if(conteo[index] == true){
                        getProyecto(index)
                    }
                }
            }
            cvsCreate();
}

    

);


function getProyecto(idn) {

    fetch("data/Votos congresistas/Proyectos.json")
    .then(function (resp){
        return resp.json();
    })
        .then(function (data){
            if(data.proyecto.length > 0){
                data.proyecto.forEach((u) => { 

                    var idpro = u.id;
                    if (idpro == idn){

                        var etiquetas = u.etiquetas;

                        etiquetas.forEach((i) => {
                        switch (u.iniciativa) {
                                case "Legislativa":
                                    var index = conteoA[i.id]
                                    conteoA[i.id] = index+1
                                    break;
                                case "Popular":
                                    var index = conteoB[i.id]
                                    conteoB[i.id] = index+1
                                    break;
                            
                                case "Gubernamental":
                                    var index = conteoC[i.id]
                                    conteoC[i.id] = index+1
                                    break;
                            
                                case "Mixta":
                                    var index = conteoD[i.id]
                                    conteoD[i.id] = index+1
                                    break;
                                
                                case "Otras entidades":
                                    var index = conteoE[i.id]
                                    conteoE[i.id] = index+1
                                    break;
                                default:
                                    break;
                            }
                        })
    
                    }    
                })
                

            }
}
); 


}

function cvsCreate() {
    fetch("data/temas.json")
    .then(function (resp){
        return resp.json();
    })
        .then(function (data){
            if(data.length > 0){
                data.forEach((u) => { 

                    temas2.push(u.id)
                })
                console.log(temas2);

                conteoTotalCt.push(["id","groupid","size"])

                for(let jndex = 0; jndex < temas2.length; jndex++)
                {
                    if (conteoA[jndex+1] > 0)
                    {
                        conteoTotalCt.push([temas2[jndex],"1",String(conteoA[jndex+1])])
                    }
                    
                }
                for(let jndex = 0; jndex < temas2.length; jndex++)
                {
                    if (conteoB[jndex+1] > 0)
                    {
                    conteoTotalCt.push([temas2[jndex],"2",String(conteoB[jndex+1])])
                    }
                }
                for(let jndex = 0; jndex < temas2.length; jndex++)
                {
                    if (conteoC[jndex+1] > 0)
                    {
                    conteoTotalCt.push([temas2[jndex],"3",String(conteoC[jndex+1])])
                    }
                }
                for(let jndex = 0; jndex < temas2.length; jndex++)
                {
                    if (conteoD[jndex+1] > 0)
                    {
                    conteoTotalCt.push([temas2[jndex],"4",String(conteoD[jndex+1])])
                    }
                }
                for(let jndex = 0; jndex < temas2.length; jndex++)
                {
                    if (conteoE[jndex+1] > 0)
                    {
                    conteoTotalCt.push([temas2[jndex],"5",String(conteoE[jndex+1])])
                    }
                } 

                console.log(conteoTotalCt);

                let csvContent = "data:text/csv;charset=utf-8," 
                + conteoTotalCt.map(e => e.join(",")).join("\n");

                //var encodedUri = encodeURI(csvContent);
                //window.open(encodedUri);

            }
}
);
}




