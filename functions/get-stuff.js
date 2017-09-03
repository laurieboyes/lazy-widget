
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handle = (event, context, callback) => {

	const tableName = event.pathParameters.tableName;
	console.log('Scanning table ' + tableName);

	documentClient.scan({
		TableName: tableName
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