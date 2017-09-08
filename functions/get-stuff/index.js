
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const createChart = require('./lib/create-chart');

module.exports.handle = (event, context, callback) => {

	const tableName = event.pathParameters && event.pathParameters.tableName;
	const sinceDays = event.queryStringParameters && event.queryStringParameters.sinceDays || 7;
	console.log(`Scanning table ${tableName} and filterting for events within the previous ${sinceDays} days`);

	const sinceDate = new Date();
	sinceDate.setDate(sinceDate.getDate() - sinceDays)
	const since = sinceDate.getTime();

	documentClient.scan({
		TableName: tableName,
		FilterExpression: 'eventDateTime > :since',
		ExpressionAttributeValues: {
			':since': since
		}
	}, (err, data) => {
		if (err) {
			callback(err);
		} else {
			if (event.headers.Accept.includes('application/json')) {
				const response = {
					statusCode: 200,
					body: JSON.stringify({
						data
					}),
				};
				callback(null, response);
			} else {
				createChart()
					.then(chartHtml => {
						const response = {
							statusCode: 200,
							headers: {
								'Content-Type': 'text/html'
							},
							body: chartHtml
						};
						callback(null, response);
					});
			}
		}
	})
};