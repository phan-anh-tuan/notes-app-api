import uuid from 'uuid';
import AWS from 'aws-sdk';
import {success, failure} from './lib/response-lib';
import * as dynamoDbLib from './lib/dynamodb-lib';

export function main (event, context, callback) {
  const data = JSON.parse (event.body);

  const params = {
    TableName: 'notes',
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1 (),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now (),
    },
  };

  dynamoDbLib
    .call ('put', params)
    .then (() => callback (null, success (params.Item)))
    .catch (error => callback (null, failure ({status: false})));
}
