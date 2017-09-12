const transformGraphData = require('../../../functions/get-stuff/lib/transform-graph-data');
const { expect } = require('chai');

const rawDataFixture = {
	"data": {
		"Items": [
			{
				"eventDateTime": 1504464399737,
				"eventIsoDateTime": "2017-09-03T18:46:39.737Z"
			},
			{
				"eventDateTime": 1504596315037,
				"eventIsoDateTime": "2017-09-05T07:25:15.037Z"
			},
			{
				"eventDateTime": 1504596315037,
				"eventIsoDateTime": "2017-09-05T09:25:15.037Z"
			},
			{
				"eventDateTime": 1504818714078,
				"eventIsoDateTime": "2017-09-07T21:11:54.078Z"
			},
			{
				"eventDateTime": 1504818714078,
				"eventIsoDateTime": "2017-09-07T23:11:54.078Z"
			}
		],
		"Count": 4,
		"ScannedCount": 5
	}
}


describe('Transform graph data', () => {
	it('should add the counts for each day within the dates given in the parameters, and return the transformed data', () => {
		const startDayString = '2017-09-03' 
		const endDayString = '2017-09-08';
		expect(transformGraphData(startDayString, endDayString, rawDataFixture)).to.deep.equal({
			labels: [
				'Su 3/9',
				'Mo 4/9',
				'Tu 5/9',
				'We 6/9',
				'Th 7/9',
				'Fr 8/9'
			],
			series: [
				{ value: [1, 0, 2, 0, 2, 0] },
			]
		})
	});
});