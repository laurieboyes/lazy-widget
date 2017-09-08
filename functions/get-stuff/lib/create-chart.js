const generate = require('node-chartist');
const fs = require('fs');

const styles = `<style>${fs.readFileSync('node_modules/chartist/dist/chartist.min.css', 'utf8')}</style>`;

module.exports = () => {

	const options = {
		width: 400,
		height: 200,
		axisX: { title: 'X Axis (units)' },
		axisY: { title: 'Y Axis (units)' }
	};

	const data = {
		labels: ['a', 'b', 'c', 'd', 'e'],
		series: [
			{ name: 'Series 1', value: [1, 2, 3, 4, 5] },
			{ name: 'Series 2', value: [3, 4, 5, 6, 7] }
		]
	}

	return generate('line', options, data)
		.then(chartHtml => {
			return styles + chartHtml;
		});
}

