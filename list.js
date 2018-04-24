import * as dynamoDbLib from './lib/dynamodb-lib'
import {success,failure} from './lib/response-lib'

export function main(event,context,callback) {
    const params = {
        TableName: 'notes',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': event.requestContext.identity.cognitoIdentityId          
        }
    }
    dynamoDbLib.call('query',params)
        .then(result => callback(null,success(result.Items)))
        .catch(error => callback(null,failure({status: false})))
}