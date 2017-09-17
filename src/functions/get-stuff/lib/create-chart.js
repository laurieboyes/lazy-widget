const generate = require('node-chartist');
const fs = require('fs');
const transformGraphData = require('./transform-graph-data');
const addThresholdClasses = require('./add-threshold-classes');
const moment = require('moment');
const devFlags = require('../../../dev/flags');

const styles = `<style>
	body {
		margin: 0;
	}

	.ct-line {
		stroke: lightgrey !important;
		stroke-width: 2px !important;
	}

	.point-above-threshold {
		stroke: limegreen !important;
	}

${fs.readFileSync('node_modules/chartist/dist/chartist.min.css', 'utf8')}
</style>`;

module.exports = (data, sinceDays) => {

	const options = {
		// these are hard coded based on the size of my webpage widget
		width: 378,
		height: 194
	};

	const toDate = devFlags.getDummyData ? '2017-09-08' : moment();
	const fromDate = devFlags.getDummyData ? '2017-09-03' : moment().subtract(sinceDays, 'days');

	const graphData = transformGraphData(toDate, fromDate, data)

	const goodThreshold = 3;

	return generate('line', options, graphData)
		.then(chartHtml => {
			const chartHtmlWithThresholds = addThresholdClasses(chartHtml, goodThreshold);
			return styles + chartHtmlWithThresholds;
		});
}

