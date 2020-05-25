function bubbleChart() {
    const width = 600;
    const height = 400;

    // location to centre the bubbles
    const centre = { x: width/2 - 10 , y: height/2 - 70 };

    // strength to apply to the position forces
    const forceStrength = 0.03;

    // these will be set in createNodes and chart functions
    let svg = null;
    let bubbles = null;
    let labels = null;
    let nodes = [];

    // charge is dependent on size of the bubble, so bigger towards the middle
    function charge(d) {
      return Math.pow(d.radius, 2.0) * 0.01
    }

    // create a force simulation and add forces to it
    const simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody().strength(charge))
      // .force('center', d3.forceCenter(centre.x, centre.y))
      .force('x', d3.forceX().strength(forceStrength).x(centre.x))
      .force('y', d3.forceY().strength(forceStrength).y(centre.y))
      .force('collision', d3.forceCollide().radius(d => d.radius + 1));

    // force simulation starts up automatically, which we don't want as there aren't any nodes yet
    simulation.stop();

    // set up colour scale
    const fillColour = d3.scaleOrdinal()
    .domain(["1", "2", "3", "4", "5"])
    .range(["#ed553b", "#3caea3", "#20639b", "#173f5f", "#f6d55c"]);

    // data manipulation function takes raw data from csv and converts it into an array of node objects
    // each node will store data and visualisation values to draw a bubble
    // rawData is expected to be an array of data objects, read in d3.csv
    // function returns the new node array, with a node for each element in the rawData input
    function createNodes(rawData) {
      // use max size in the data as the max in the scale's domain
      // note we have to ensure that size is a number
      const maxSize = d3.max(rawData, d => +d.size);

      // size bubbles based on area
      const radiusScale = d3.scaleLinear()
        .domain([0, maxSize+10])
        .range([5, 35])

      // use map() to convert raw data into node data
      const myNodes = rawData.map(d => ({
        ...d,
        radius: radiusScale(+d.size),
        size: +d.size,
        x: Math.random() * 900,
        y: Math.random() * 800
      }))

      return myNodes;
    }

    // main entry point to bubble chart, returned by parent closure
    // prepares rawData for visualisation and adds an svg element to the provided selector and starts the visualisation process
    let chart = function chart(selector, rawData) {
      // convert raw data into nodes data
      nodes = createNodes(rawData);

      // create svg element inside provided selector
      var svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      // Three function that change the tooltip when user hover / move / leave a cell
      var tooltip = d3.select("body")
        .append("div")
        //.attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("border-radius", "15px 15px 15px 5px")
        .style("padding", "10px")
        .style("box-shadow","-3px 3px 15px #888888")
        .style("background-color", "white")

      //tooltip.text("my tooltip text");

      // bind nodes data to circle elements
      const elements = svg.selectAll('.bubble')
        .data(nodes, d => d.id)
        .enter()
        .append('g')
        .on("mouseover", function(d){
          var text = "Tema: " + d.id + ", Frecuencia: " + d.size;
          tooltip.text(text);
          return tooltip.style("visibility", "visible");})
        .on("mousemove", function(d){return tooltip.style("top",(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function (d){return tooltip.style("visibility", "hidden");})

      bubbles = elements
        .append('circle')
        .classed('bubbles', true)
        .attr('r', d => d.radius)
        .attr('fill', d => fillColour(d.groupid))

      // labels
      labels = elements
        .append('text')
        .attr('dy', '.3em')
        .style('text-anchor', 'middle')
        .style('font-size', 10)
        //.text(d => d.id)

        svg.append("circle").attr("cx",120).attr("cy",360).attr("r", 8).style("fill", "#ed553b")
        svg.append("circle").attr("cx",250).attr("cy",360).attr("r", 8).style("fill", "#3caea3")
        svg.append("circle").attr("cx",420).attr("cy",360).attr("r", 8).style("fill", "#20639b")

        svg.append("circle").attr("cx",190).attr("cy",385).attr("r", 8).style("fill", "#173f5f")
        svg.append("circle").attr("cx",340).attr("cy",385).attr("r", 8).style("fill", "#f6d55c")

        svg.append("text").attr("x", 140).attr("y", 360).text("Gobierno").style("font-size", "15px").style("font-family", "Questrial").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 270).attr("y", 360).text("Iniciativa Popular").style("font-size", "15px").style("font-family", "Questrial").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 440).attr("y", 360).text("Legislativa").style("font-size", "15px").style("font-family", "Questrial").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 210).attr("y", 385).text("Mixta").style("font-size", "15px").style("font-family", "Questrial").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 360).attr("y", 385).text("Otras Entidades").style("font-size", "15px").style("font-family", "Questrial").attr("alignment-baseline","middle")

      // set simulation's nodes to our newly created nodes array
      // simulation starts running automatically once nodes are set
      simulation.nodes(nodes)
        .on('tick', ticked)
        .restart();
    }

    // callback function called after every tick of the force simulation
    // here we do the actual repositioning of the circles based on current x and y value of their bound node data
    // x and y values are modified by the force simulation
    function ticked() {
      bubbles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)

      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y)
    }

    // return chart function from closure
    return chart;
  }

  // new bubble chart instance
  let myBubbleChart = bubbleChart();

  // function called once promise is resolved and data is loaded from csv
  // calls bubble chart function to display inside #vis div
  function display(data) {
    myBubbleChart('#vis', data);
  }

  // load data
  d3.csv('./data/csv/CV/iniciativas.csv').then(display);
