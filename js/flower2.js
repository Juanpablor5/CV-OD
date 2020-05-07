var data = [{"Tema":"Educación","abs":2},
                    {"Tema":"Salud","abs":12},
                    {"Tema":"Corrupción","abs":10},
                    {"Tema":"Transporte","abs":13},
                    {"Tema":"Militar","abs":3},          
                    {"Tema":"Economia","abs":11},
                    {"Tema":"Politica Extranjera","abs":5}];
        //<!----------------------------------------------------------------->
        var margin = {top:10,left:10,right:10,bottom:10};
        width = 200;
        height = 250;
        radius = Math.min(width,height)/2;
        var color = d3.scale.category20();
        var arc = d3.svg.arc()  
                .outerRadius(radius -100)
                .innerRadius(radius - 70)
            .cornerRadius(20);
        var arcOver = d3.svg.arc()  
        .outerRadius(radius +50)
        .innerRadius(0);

        var a=width/2 - 10;
        var b=height/2 - 70;
        var svg = d3.select("#svgContent2").append("svg")
                  .attr("viewBox", "0 0 " + width + " " + height/2)
            .attr("preserveAspectRatio", "xMidYMid meet")
                  .append("g")
                  .attr("transform","translate("+a+","+b+")");

              div = d3.select("body")
        .append("div") 
        .attr("class", "tooltip");
        var pie = d3.layout.pie()
                  .sort(null)
                  .value(function(d){return d.abs;})
              .padAngle(.02);
        var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class","arc")
                .on("mousemove",function(d){
                  var mouseVal = d3.mouse(this);
                  div.style("display","none");
                  div
                  .html("Tema: "+d.data.Tema+"</br>"+"No. votos a favor:"+d.data.abs)
                    .style("left", (d3.event.pageX+12) + "px")
                    .style("top", (d3.event.pageY-10) + "px")
                    .style("opacity", 1)
                    .style("display","block");
                })
                .on("mouseout",function(){div.html(" ").style("display","none");});

            g.append("path")
            .attr("d",arc)
            .style("fill",function(d){return color(d.data.Tema);})
            .attr("d", arc);;

                        svg.selectAll("text").data(pie(data)).enter()
                        .append("text")
                        .attr("class","label1")
                        .attr("transform", function(d) {
                        var dist=radius-60;
                      var winkel=(d.startAngle+d.endAngle)/2;
                      var x=dist*Math.sin(winkel)-4;
                      var y=-dist*Math.cos(winkel)-4;
                      
                      return "translate(" + x + "," + y + ")";
                        })
                        .attr("dy", "0.35em")
                        .attr("text-anchor", "middle")
                        
                      .text(function(d){
                        return d.value;
                      });