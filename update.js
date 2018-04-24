import * as dynamoDbLib from './lib/dynamodb-lib';
import {success, failure} from './lib/response-lib';

export function main (event, context, callback) {
  const data = JSON.parse (event.body);
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    UpdateExpression: 'set content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':content': data.content ? data.content : null,
      ':attachment': data.attachment ? data.attachment : null,
    },
    ReturnValues: 'ALL_NEW',
  };

  dynamoDbLib.call('update',params)
    .then(result => callback(null,success({status: true})))
    .catch(error => callback(null,failure({status: false})))
}
