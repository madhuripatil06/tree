const HEIGHT = 800;
const WIDTH = 800;
var data = [
    [10, 2],
    [9, 4],
    [11, 4]
];

var drawCircles = function(x_scale, y_scale, selection){
    var tree = selection.selectAll("circle")
        .data(data);

    var g = tree.enter()
            .append("g")
            .attr("transform", function(d){return "translate("+d[0]*50 +","+ d[1]*50+")"})

    g.append("circle")
        .attr("r", 20)
        .attr("class", "leaf");

    g.append("text")
        .attr("dx", function(d){return -8})
        .text(function(d){return d[0]});
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
};

window.onload = load;