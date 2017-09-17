function getPointsValues (chartHtml) {
	const regEx = /ct:value="(-?\d*)"/g;
	const pointValues = []
	let thisMatch;
	while ((thisMatch = regEx.exec(chartHtml)) !== null) {
		pointValues.push(+thisMatch[1]);
	}
	return pointValues;
}


module.exports = (chartHtml, threshold) => {
	const pointsValues = getPointsValues(chartHtml);

	let chartHtmlWithThresholds = chartHtml;
	pointsValues.forEach(pointValue => {
		if (pointValue >= threshold) {
			chartHtmlWithThresholds = chartHtmlWithThresholds.replace(
				`class="ct-point" ct:value="${pointValue}"`,
				`class="ct-point point-above-threshold" ct:value="${pointValue}"`
			)
		}
	});

	return chartHtmlWithThresholds;
};