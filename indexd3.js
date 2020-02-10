const svg = d3.select("body").select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const render = data => {
  const xValue = d => d.population;
  const yValue = d => d.country;
  const margin = { top: 20, left: 100, right: 40, bottom: 20 };
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, width - margin.left - margin.right]);

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, height - margin.top - margin.bottom])
    .padding(0.1);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g").call(d3.axisLeft(yScale));

  const xformat = a =>
    d3
      .format(".3s")(a)
      .replace("G", "B");
  g.append("g")
    .call(d3.axisBottom(xScale).tickFormat(xformat))
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`);

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", d => yScale(yValue(d)))
    .attr("width", d => xScale(xValue(d)))
    .attr("height", yScale.bandwidth());
};

d3.csv("data.csv").then(data => {
  data.forEach(element => {
    element.population = +element.population * 1000;
  });
  render(data);
});
