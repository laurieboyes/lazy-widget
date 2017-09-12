const generate = require('node-chartist');
const fs = require('fs');
const transformGraphData = require('./transform-graph-data');
const moment = require('moment');
const devFlags = require('../../../dev/flags');

const styles = `<style>${fs.readFileSync('node_modules/chartist/dist/chartist.min.css', 'utf8')}</style>`;

module.exports = (data, sinceDays) => {

	const options = {
		width: 400,
		height: 200
	};

	console.log('devFlags.getDummyData', devFlags.getDummyData);
	const toDate = devFlags.getDummyData ? '2017-09-08' : moment();
	const fromDate = devFlags.getDummyData ? '2017-09-03' : moment().subtract(sinceDays, 'days');

	const graphData = transformGraphData(toDate, fromDate, data)

	return generate('line', options, graphData)
		.then(chartHtml => {
			return styles + chartHtml;
		});
}

