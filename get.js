import * as dynamoDbLib from './lib/dynamodb-lib'
import  {success,failure} from './lib/response-lib'

export function main(event,context,callback) {
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    }
    
    dynamoDbLib.call('get',params)
        .then(result => {
            if (result.Item) {
                callback(null,success(result.Item))
            } else {
                callback(null,failure({status: false, error: 'No items found'}))
            }
        })
        .catch(error => { console.log(error); callback(null,failure({status:false}))})
}