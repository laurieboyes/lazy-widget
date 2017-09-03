
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handle = (event, context, callback) => {

	const tableName = 'Planks'

	documentClient.scan({
		TableName: tableName
	}, (err, data) => {
		if (err) {
			callback(null, err);
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