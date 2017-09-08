
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handle = (event, context, callback) => {

	const tableName = event.pathParameters.tableName;
	const date = new Date();

	console.log('Adding new event to table ' + tableName);

	documentClient.put({
		TableName: tableName,
		Item: {
			eventDateTime: date.getTime(),
			eventIsoDateTime: date.toISOString()
		}
	}, (err) => {
		if (err) {
			callback(err);
		} else {
			const response = {
				statusCode: 200,
				body: JSON.stringify({
					message: 'success'
				}),
			};
			callback(null, response);
		}
	})
};