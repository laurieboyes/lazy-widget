
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const createChart = require('./lib/create-chart');
const devFlags = require('../../dev/flags');

function queryTable (tableName, since) {
	if(devFlags.getDummyData) {
		console.log('`getDummyData` set so using dummy data 🕺');
		return Promise.resolve(require('../../dev/fixtures/planks.json'));
	}
	return new Promise((resolve, reject) => {
		documentClient.scan({
			TableName: tableName,
			FilterExpression: 'eventDateTime > :since',
			ExpressionAttributeValues: {
				':since': since
			}
		}, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

module.exports.handle = (event, context, callback) => {

	const tableName = event.pathParameters && event.pathParameters.tableName;
	const sinceDays = event.queryStringParameters && event.queryStringParameters.sinceDays || 7;
	console.log(`Scanning table ${tableName} and filtering for events within the previous ${sinceDays} days`);

	const sinceDate = new Date();
	sinceDate.setDate(sinceDate.getDate() - sinceDays)
	const since = sinceDate.getTime();

	return queryTable(tableName, since)
		.then(data => {
			if (event.headers.Accept.includes('application/json')) {
				const response = {
					statusCode: 200,
					body: JSON.stringify({
						data
					}),
				};
				callback(null, response);
			} else {
				return createChart(data, sinceDays)
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
		})
		.catch(err => {
			console.error(err);
			callback(err)
		});
};