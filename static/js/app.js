// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
      const metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const result = metadata.find(obj => obj.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([Key, Value]) => {
      panel.append("p").text(`${Key.toUpperCase()}: ${Value}`);
  });
});
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const result = samples.find(obj => obj.id === sample);

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = result.otu_ids;
    const otu_labels = result.otu_labels;
    const sample_values = result.sample_values;

    // Build a Bubble Chart
    const bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    };

    const bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      hovermode: 'closest'
    };


    // Render the Bubble Chart
  
    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    const yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const xvals = sample_values.slice(0, 10).reverse();
    const labels = otu_labels.slice(0, 10).reverse();
    const barTrace = {
      x: xvals,
      y: yticks,
      text: labels,
      type: 'bar',
      orientation: 'h'
    };
    const barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", [barTrace], barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const samples = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    samples.forEach((sample) => {
      dropdown.append("option")
      .text(sample)
      .property("value", sample);
    });

    // Get the first sample from the list
    const firstSample = samples[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
