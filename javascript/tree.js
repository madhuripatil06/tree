const HEIGHT = 800;
const WIDTH = 800;
var data = [1,2,3];

var drawCircles = function(x_scale, y_scale, selection){
    selection.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx",function(d, i){ return i*50})
        .attr("cy",function(d, i){ return i*50})
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