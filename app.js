
fetch("./data/Etiquetas.json")
.then((resp) => resp.json())
.then((data) => {
    for (let i = 0; i < data.etiquetas.length; i++) {
    console.log(data.etiquetas[i]);
    
    }
    document.write('<select id="single-optgroups" multiple> <optgroup label="JavaScript"><option value="value 1">Angular</option><option value="value 2">React</option><option value="value 3">Vue</option></optgroup><optgroup label="CSS"><option value="value 4">Bootstrap</option><option value="value 5">Foundation</option><option value="value 6">Bulma</option></optgroup></select>');
});




