dataset =
    [
        { group: "Grp 1" ,category: "Cat 1", count: 1},
        { group: "Grp 1" ,category: "Cat 2", count: 3},
        { group: "Grp 1" ,category: "Cat 3", count: 5},
        { group: "Grp 1" ,category: "Cat 4", count: 4},
        { group: "Grp 2" ,category: "Cat 1", count: 6},
        { group: "Grp 2" ,category: "Cat 2", count: 2},
        { group: "Grp 3" ,category: "Cat 1", count: 5},
        { group: "Grp 3" ,category: "Cat 2", count: 4},
        { group: "Grp 4" ,category: "Cat 1", count: 1},
        { group: "Grp 4" ,category: "Cat 3", count: 4},
        { group: "Grp 4" ,category: "Cat 5", count: 2},
        { group: "Grp 5" ,category: "Cat 2", count: 6},
        { group: "Grp 5" ,category: "Cat 4", count: 2},
        { group: "Grp 5" ,category: "Cat 5", count: 1},
        { group: "Grp 6" ,category: "Cat 1", count: 5},
        { group: "Grp 6" ,category: "Cat 2", count: 3},
        { group: "Grp 6" ,category: "Cat 3", count: 2},
        { group: "Grp 6" ,category: "Cat 4", count: 1},
        { group: "Grp 6" ,category: "Cat 5", count: 5},
        { group: "Grp 6" ,category: "Cat 6", count: 3},
    ];

    var flags = [], unique_categories = [], unique_groups=[], l = dataset.length, i;
    for( i=0; i<l; i++) {
        if( flags[dataset[i].category]) continue;
        flags[dataset[i].category] = true;
        unique_categories.push(dataset[i].category);
    }
    flags = [];
    for( i=0; i<l; i++) {
        if( flags[dataset[i].group]) continue;
        flags[dataset[i].group] = true;
        unique_groups.push(dataset[i].group);
    }

    var groupScale = d3.scale.ordinal().domain(unique_groups).rangePoints([0, unique_groups.length - 1]);
    var categoryScale = d3.scale.ordinal().domain(unique_categories).rangePoints([0, unique_categories.length]);

    var color = d3.scale.category20();

    // Set the dimensions of the canvas / graph
    var	margin = {top: 20, right: 50, bottom: 50, left: 150},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Set the ranges
    var	xScale = d3.scale.linear().range([50, width]);
    var	yScale = d3.scale.linear().range([height, 50]);

    var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom");

    var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .tickFormat(function (d) {
                    return unique_groups[d];
                })
                .ticks(unique_groups.length)


    var result = dataset.reduce(function(res, obj) {
        if (!(obj.group in res))
            res.__array.push(res[obj.group] = obj);
        else {
            res[obj.group].count += obj.count;
        }
        return res;
    }, {__array:[]}).__array
                    .sort(function(a,b) { return b.count - a.count; });

    xScale.domain([0,result[0].count + 4]);
    yScale.domain([0,d3.max(dataset,function(d){return groupScale(d.group);})]);

    //Create SVG element
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //CREATE X-AXIS
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    //Create Y axis
    svg.append("g")
        .attr("transform", "translate(50,0)")
        .attr("class", "y axis")
        .call(yAxis);


    function generate_array(d){
        var k = 0;
        for(var j=0;j<dataset.length;j++){
            if(groupScale(dataset[j].group) == groupScale(d.group) && categoryScale(dataset[j].category) < categoryScale(d.category)){
                k = k + dataset[j].count/2;
            }
        }

        var arr = new Array(d.count);
        for(var i=0;i<d.count;i++){
            arr[i] = {y:groupScale(d.group),x:k+i/2,group:d.group,category:d.category};
        }

        return arr;
    }

    var groups = svg
       .selectAll("g.group")
       .data( dataset )
        .enter()
        .append('g')
        .attr("class", "group");

    var circleArray = groups.selectAll("g.circleArray")
    .data(function(d) {return generate_array(d);});

    circleArray.enter()
    .append('g')
    .attr("class", "circleArray")
    .append("circle")
    .style("fill",function(d){return color(d.category);})
    .attr("r", 5)
    .attr("cx", function(d,i) {return xScale(d.x); })
    .attr("cy", function(d,i) { return yScale(d.y); });

    // add legend
    var legend = svg
    .selectAll(".legend")
    .data(unique_categories)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", "translate(0," + 50 + ")");

    legend
      .append("rect")
      .attr("x", width-margin.right)
      .attr("y", function(d,i){return i*20;})
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d) {
        return color(d);
      })

    legend
      .append("text")
      .attr("x", width-margin.right+15)
      .attr("y", function(d,i){return i*20 + 10;})
      .text(function(d){return d});


    var tooltip = d3.select("#chart")
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div')
    .attr('class', 'group');
    tooltip.append('div')
    .attr('class', 'category');
    tooltip.append('div')
    .attr('class', 'count');

    svg.selectAll("circle")
    .on('mouseover', function(d,i) {

        tooltip.select('.group').html("<b>Group: " + d.group+ "</b>");
        tooltip.select('.category').html("<b>Category: " + d.category+ "</b>");
        tooltip.select('.count').html("<b>Count: " + d.x + "</b>");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

    })
    .on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function() {
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });