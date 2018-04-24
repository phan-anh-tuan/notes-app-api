import * as dynamoDbLib from './lib/dynamodb-lib';
import {success, failure} from './lib/response-lib';

export function main (event, context, callback) {
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  }

  dynamoDbLib.call('delete',params)
    .then(result => callback(null,success({status: true})))
    .catch(error => callback(null,failure({status: false})))
}
