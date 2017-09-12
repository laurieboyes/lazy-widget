const moment = require('moment');

module.exports = (startDate, endDate, { data: { Items: activityPoints } }) => {
	const numDays = moment(endDate).diff(moment(startDate), 'days') + 1;
	const days = [...Array(numDays)].map((_, i) => moment(startDate).add(i, 'days'));
	const labels = days.map(day => day.format('dd D/M'));
	const counts = days.map(day => activityPoints.filter(point => day.isSame(point.eventDateTime, 'day')).length);
	return {
		labels,
		series: [{
			value: counts
		}]
	};
};