/**
 * Created by John on 08/30/2015.
 * Modified from example by http://bl.ocks.org/mbostock/4063550
 */

// run the data tables function for the full tag list tab
"use strict";

$(document).ready(function () {
    $('#keywordTable').DataTable({
        "lengthMenu": [[25, 50, -1], [25, 50, "All"]]
    });
});

// run the keyword relationships d3 chart
var diameter = 1280; // change the entire wheel diameter

var tree = d3.layout.tree().size([360, diameter / 2 - 120]) // affects the placement of the right side of the tree
.separation(function (a, b) {
    return (a.parent == b.parent ? 1 : 2) / a.depth;
});

var diagonal = d3.svg.diagonal.radial().projection(function (d) {
    return [d.y, d.x / 180 * Math.PI];
}); //changes line layout

var svg = d3.select("#techWheel").append("svg").attr("width", diameter).attr("height", diameter) // affects the center of the wheel. Increase value to lower center.
.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")"); // move entire diagram center

d3.json("./assets/scripts/techFamily.json", function (error, root) {
    if (error) throw error;

    var nodes = tree.nodes(root),
        links = tree.links(nodes);

    var link = svg.selectAll(".link").data(links).enter().append("path").attr("class", "link").attr("d", diagonal);

    var node = svg.selectAll(".node").data(nodes).enter().append("g").attr("class", "node").attr("transform", function (d) {
        return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
    }); // rotates the text wheel
    node.append("circle").attr("r", 4.5); // changes the size of the blue circles

    node.append("text") // makes text start up or down correctly. Colored in CSS class ".node text".
    .attr("dy", ".30em").attr("text-anchor", function (d) {
        return d.x < 180 ? "start" : "end";
    }).attr("transform", function (d) {
        return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
    }).text(function (d) {
        return d.name;
    });
});

//d3.select(self.frameElement).style("height", diameter - 150 + "px"); // affects the center of the wheel (original line)
d3.select(self.frameElement).style("height", diameter - 150 + "px");

//# sourceMappingURL=techFamilyWheel-compiled.js.map