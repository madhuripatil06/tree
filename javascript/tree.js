const HEIGHT = 800;
const WIDTH = 800;
var data = [
    {x: 500, y: 100, name: 1},
    {x: 450, y: 200, name: 2},
    {x: 550, y: 200, name: 3}
];

var lineData = [
    {x1: 500, y1:120 , x2: 450, y2: 180  },
    {x1: 500, y1:120 , x2: 550, y2: 180  },
];

var drawLines = function(selection){
    var edges = selection.selectAll("line")
        .data(lineData);

    edges.enter()
        .append("line")
        .attr("x1", function(d){ return d.x1})
        .attr("y1", function(d){ return d.y1})
        .attr("x2", function(d){ return d.x2})
        .attr("y2", function(d){ return d.y2})
        .style("stroke", "black");
};

var drawCircles = function(x_scale, y_scale, selection){
    var tree = selection.selectAll("circle")
        .data(data);

    var g = tree.enter()
            .append("g")
            .attr("transform", function(d){return "translate("+d.x +","+ d.y+")"})

    g.append("circle")
        .attr("r", 20)
        .attr("class", "leaf");

    g.append("text")
        .attr("dx", function(d){return -8})
        .text(function(d){return d.name});
};

var load = function(){
    var x_scale = d3.scaleLinear()
        .range([])
        .domain([]);

    var y_scale = d3.scaleLinear()
            .range([])
            .domain([]);

    var container = d3.select(".container")
        .append("svg")
        .attr("height", HEIGHT)
        .attr("width", WIDTH);

    drawCircles(x_scale, y_scale, container);
    drawLines(container);
};

window.onload = load;