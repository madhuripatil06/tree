const HEIGHT = 800;
const WIDTH = 800;
const CIRCLE_RADIUS = 20;
const START_X = 500;
const START_Y = 100;
const EDGE_LENGHT = 50;
var data_array = ["+",1,["+", 2, ["-", 5, 6]]];

var generateLineData = function(input, curr_x, curr_y){
    var edges = [
    {x1: curr_x, y1: curr_y + CIRCLE_RADIUS, x2: curr_x - EDGE_LENGHT,y2: (curr_y+START_Y) - CIRCLE_RADIUS},
    {x1: curr_x, y1: curr_y + CIRCLE_RADIUS, x2: curr_x + EDGE_LENGHT,y2: (curr_y+START_Y) - CIRCLE_RADIUS},
    ];
    return edges;
};

var generateCircleData = function(input, curr_x, curr_y){
    console.log("-----------------", input);
    var circleData = [
         {x: curr_x, y: curr_y, name: input[0]},
         {x: curr_x - EDGE_LENGHT, y: (curr_y+START_Y), name: input[1]}
    ];
    if(input.length == 3)
        circleData.push({x: curr_x + EDGE_LENGHT, y: (curr_y+ START_Y), name: input[2]})
    return circleData;
};

var drawLines = function(selection, data){
    var edges = selection.selectAll("line")
        .data(data);

    edges.enter()
        .append("line")
        .attr("x1", function(d){ return d.x1})
        .attr("y1", function(d){ return d.y1})
        .attr("x2", function(d){ return d.x2})
        .attr("y2", function(d){ return d.y2})
        .attr("class", "edge");
};

var result = [];
var line = [];

var generatePositions = function(data, curr_x, curr_y){
    if(typeof(data[2]) == "object"){
        result = result.concat(generateCircleData([data[0], data[1]], curr_x, curr_y));
        curr_x += EDGE_LENGHT;
        curr_y += START_Y;
        result = result.concat(generatePositions(data[2], curr_x, curr_y));
        line = line.concat(generatePositions(data[2], curr_x, curr_y));
    }
    else{
       console.log(data.length, '=============')
       line = line.concat(generateLineData(data, curr_x, curr_y));
       result = result.concat(generateCircleData(data, curr_x, curr_y));
    }
    return {"circles":result, "line": line};
};

var drawCircles = function(x_scale, y_scale, selection, data){
    var tree = selection.selectAll("circle")
        .data(data);

    var g = tree.enter()
            .append("g")
            .attr("transform", function(d){return "translate("+d.x +","+ d.y+")"});

    g.append("circle")
        .attr("r", CIRCLE_RADIUS)
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

    var circles=generatePositions(data_array, START_X, START_Y);
    drawCircles(x_scale, y_scale, container, circles["circles"]);

    var line = circles["line"]
//    drawLines(container, line);
};

window.onload = load;