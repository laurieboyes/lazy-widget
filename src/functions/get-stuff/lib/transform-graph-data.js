const moment = require('moment');

module.exports = (toDate, fromDate, { Items: activityPoints }) => {
	const numDays = moment(toDate).diff(moment(fromDate), 'days') + 1;
	console.log('numDays', numDays);
	const days = [...Array(numDays)].map((_, i) => moment(fromDate).add(i, 'days'));
	const labels = days.map(day => day.format('dd D/M'));
	const counts = days.map(day => activityPoints.filter(point => day.isSame(point.eventDateTime, 'day')).length);
	return {
		labels,
		series: [{
			value: counts
		}]
	};
};