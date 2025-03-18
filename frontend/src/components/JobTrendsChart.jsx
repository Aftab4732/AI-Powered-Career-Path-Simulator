import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const JobTrendsChart = () => {
  const chartRef = useRef();
  const [error, setError] = useState("");
  const career = localStorage.getItem("selectedCareer") || "Full-Stack Developer";

  useEffect(() => {
    const fetchJobTrends = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/job-trends?career=${encodeURIComponent(career)}`);

        // 🛑 Log raw response before parsing
        const text = await response.text();
        console.log("Raw API Response:", text);

        const jobData = JSON.parse(text); // Now safely parse JSON
        console.log("Parsed Job Data:", jobData);

        if (!jobData.historicalTrends || jobData.historicalTrends.length === 0) {
          setError("No job trend data available.");
          return;
        }

        renderChart(jobData.historicalTrends); // ✅ Fix: Pass the correct array
      } catch (err) {
        console.error("Error fetching job trends:", err);
        setError("Failed to load job trends.");
      }
    };

    fetchJobTrends();
  }, []);

  const renderChart = (jobData) => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous drawings

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // ✅ Fix: Use 'year' instead of 'industry'
    const x = d3.scaleBand().domain(jobData.map(d => d.year)).range([0, width]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(jobData, d => d.jobDemand)]).nice().range([height, 0]);

    const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    chart.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    chart.append("g")
      .call(d3.axisLeft(y));

    chart.selectAll(".bar")
      .data(jobData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.year)) // ✅ Fix: Use 'year'
      .attr("y", d => y(d.jobDemand))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.jobDemand))
      .attr("fill", "#0088FE");
  };

  return (
    <div className="chart-container">
      <h2>Job Market Trends</h2>
      {error ? <p className="error">{error}</p> : <svg ref={chartRef} width={600} height={300}></svg>}
    </div>
  );
};

export default JobTrendsChart;
