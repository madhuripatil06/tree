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

    tree.enter()
        .append("circle")
        .attr("cx",function(d, i){ console.log(d[0]); return d[0]*50})
        .attr("cy",function(d, i){ return d[1]*50})
        .attr("r", 20)
        .attr("class", "leaf");
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