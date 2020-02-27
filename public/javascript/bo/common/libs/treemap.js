

export default class TreeMap {

  constructor(idName, data, options) {

    let chartDiv = document.getElementById(idName);
    d3.select(chartDiv).html('');
    let svg = d3.select(chartDiv).append("svg");

    let format = d3.format("");

    let colors = [
      "#AA2121",
      "#C84040",
      "#ED7171",
      "#7EC17E",
      "#518651",
      "#215E2C"
    ];

    function getColor(val) {
      let color = "red"
      switch (parseInt(val)) {
        case -10:
        case -9:
        case -8:
        case -7:
          color = colors[0]
          break;
        case -6:
        case -5:
        case -4:
        case -3:
          color = colors[1]
          break;
        case -2:
        case -1:
          color = colors[2]
          break;
        case 0:
        case 1:
        case 2:
          color = colors[3]
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          color = colors[4]
          break;
        default:
          color = colors[5]
      }
      return color
    }

    var tooltip = d3.select(`#${idName}`).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    function redraw() {
      var width = chartDiv.clientWidth;
      var height = chartDiv.clientHeight;

      d3.select(`#${idName} svg`).html("");

      let chart = () => {
        const root = treemap(filteredData);

        const svg = d3.select(`#${idName} svg`);

        svg
          .attr("width", width)
          .attr("height", height)
          .classed("svg-content-responsive", true);

        const leaf = svg
          .selectAll("g")
          .data(root.leaves())
          .enter()
          .append("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
          .on("mousemove", function (d) {
            // console.log(d)
            tooltip.transition()
              .duration(300)
              .style("opacity", .98);
            tooltip.html(`<div class="tooltip-body" data-id=${d.data.name} >
              <ul>
                <li>Share: ${d.data.name}</li>
                <li>price: ${d.data.price}</li>
                <li>Change: ${d.data.pc}</li>
                <li># todo line chart</li>
              </ul>
          </div>`)
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY + 10) + "px");
          })
          .on("mouseout", function (d) {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          });

        // leaf.append("title").text(
        //   d =>
        //     `${d
        //       .ancestors()
        //       .reverse()
        //       .map(d => d.data.name)
        //       .join("/")}\n${format(d.value)}`
        // );

        leaf
          .append("rect")
          .attr("id", d => (d.leafUid = "#leaf").id)
          .attr("fill", (d) => getColor(d.data.pc))
          .attr("fill-opacity", 1.0)
          .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0)
          .attr("class", (d) => "node level-" + d.depth);
        // .on("mouseover", (d) => {
        //   d3.select(this)
        //     .style("stroke", "yellow")
        //     .style("opacity", 1)
        //  });

        // leaf.append("clipPath")
        //     .attr("id", d => (d.clipUid = ("#clip")).id)
        //     .append("use")
        //     .attr("xlink:href", d => d.leafUid.href);

        let txt = leaf
          .append("text")
          .attr("fill", "#fff")
          .attr("text-anchor", "middle")
          .attr("class", "shadow")
          // .attr("dy", "1.7em")
          .attr("y", function () {
            const parentData = d3.select(this.parentNode).datum();
            return (parentData.y1 - parentData.y0) / 2;
          })
          // .attr("x", "1.7em")
          // .attr("unicode-bidi","isolate-override")
          .attr("font-size", d => Math.min(d.x1 - d.x0, d.y1 - d.y0) / 6);


        // Add a <tspan class="title"> for every data element.
        txt.append("tspan")
          .text(d => d.data.name)
          .attr("class", "title")
          .attr("dy", "-1.5em")
          .attr("x", function () {
            const parentData = d3.select(this.parentNode).datum();
            return (parentData.x1 - parentData.x0) / 2;
          });

        // Add a <tspan class="author"> for every data element.
        txt.append("tspan")
          .text(d => `$${format(d.data.price)}`)
          .attr("class", "price")
          .attr("dy", "1.4em")
          .attr("x", function () {
            const parentData = d3.select(this.parentNode).datum();
            return (parentData.x1 - parentData.x0) / 2;
          });

        // Add a <tspan class="author"> for every data element.
        txt.append("tspan")
          .text(d => (d.data.pc > 0) ? `+${d.data.pc}%` : `${d.data.pc}%`)
          .attr("class", "percent")
          .attr("dy", "1.4em")
          .attr("x", function () {
            const parentData = d3.select(this.parentNode).datum();
            return (parentData.x1 - parentData.x0) / 2;
          });

        // Add a <tspan class="text"> for every text line.
        // txt.selectAll("tspan.text")
        //     .data(d => d.text.split("\n"))
        //     .enter()
        //     .append("tspan")
        //     .attr("class", "text")
        //     .text(d => d)
        //     .attr("dy", "1.1em")
        //     .attr("x", function() {
        //       const parentData = d3.select(this.parentNode).datum();
        //       return (parentData.x1 - parentData.x0) / 2;
        //     });  

        //       .selectAll("tspan")
        //       .data(d =>
        //         d.data.name
        //           .split(/(?=[A-Z][^A-Z])/g)
        //           .concat(format(d.data.volume))
        //           .concat("+%"+format(d.data.pc))
        //       )
        //       .enter()
        //       .append("tspan")
        //       // .style("width", d => d.x1 - d.x0)
        //       // .style("height", d => d.y1 - d.y0)
        //       // .attr("direction" ,"rtl")
        //       // .attr("xml:lang","fa")
        //       // .attr("unicode-bidi","bidi-override")
        //       // .attr("transform", "(250 250 250 250)")
        //       // .style("text-anchor", "start")
        //       // .attr("dominant-baseline", "central")
        //       // .attr("y", function() {
        //       //   const parentData = d3.select(this.parentNode).datum();
        //       //   return (parentData.y1 - parentData.y0) / 2;
        //       // })
        //       .attr("dy", "1.4em")
        //       .attr("x", function() {
        //         const parentData = d3.select(this.parentNode).datum();
        //         return (parentData.x1 - parentData.x0) / 2;
        //       })
        //       .attr("font-weight", (d, i, nodes) =>
        //         i === nodes.length - 1 ? "400" : "700"
        //       )
        //       .text(d => d);





        // Add title for the top level
        // svg
        //   .selectAll("titles")
        //   .data(
        //     root.descendants().filter(function (d) {
        //       return d.depth == 1;
        //     })
        //   )
        //   .enter()
        //   .append('g')
        //   .attr("x", (d) => d.x0)
        //   .attr("y", (d) => d.y0)
        //   .attr("dx", (d) => d.x0 + d.x1)
        //   .attr("dy", (d) => d.y0 + d.y1)
        //   .append("text")
        //   .attr("x", (d) => d.x0 + 3)
        //   .attr("y", (d) => d.y0 + 18)
        //   .text((d) => d.data.name)
        //   // .attr("font-size", d => Math.max(d.x1 - d.x0, d.y1 - d.y0) / 22)
        //   .attr("font-size", "16px")
        //   .attr("font-weight", "400")
        //   .attr("fill", "#fff");

        return svg.node();
      };

      let filteredData = d3
        .hierarchy(data)
        .sum(d => d.volume)
        .sort((a, b) => b.height - a.height || b.value - a.value);

      let reg = d3.selectAll("input[name='dtype']").on("change", function () {
        let dtype = this.value;
      });

      let treemap = d3
        .treemap()
        .size([width, height])
        .padding(1)
        .round(true);

      // let charsts = d3.select(`#${idName}`);

      let format = d3.format("");

      chart();
    }

    // Draw for the first time to initialize.
    redraw();

    // Redraw based on the new size whenever the browser window is resized.
    window.addEventListener("resize", redraw);

    // ZOOM Function
    var instance = panzoom(document.getElementById(idName), {
      bounds: true,
      boundsPadding: 1,
      boundsDisabledForZoom: true,
      zoomSpeed: 0.06,
      maxZoom: 20,
      minZoom: 1
    });

    instance.on("panstart", function (e) {
      // console.log("Fired when pan is just started ", e);
      // Note: e === instance.
    });

    instance.on("pan", function (e) {
      // console.log("Fired when the scene is being panned", e);
    });

    instance.on("panend", function (e) {
      // console.log("Fired when pan ended", e);
    });

    instance.on("zoom", function (e) {
      // console.log("Fired when scene is zoomed", e);
    });

    instance.on("transform", function (e) {
      // This event will be called along with events above.
      // console.log("Fired when any transformation has happened", e);
    });

  }

}

