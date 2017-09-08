
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

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
			const response = {
				statusCode: 200,
				body: JSON.stringify({
					data
				}),
			};
			callback(null, response);
		}
	})
};