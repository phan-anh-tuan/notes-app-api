export function success(body) {
    return buildResponse(200,body)
}

export function failure(body) {
    return buildResponse(500,body)
}

function buildResponse(statusCode,body) {
    return {
        statusCode: statusCode,
        // Set response headers to enable CORS (Cross-Origin Resource Sharing)
        headers: {
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    }
}