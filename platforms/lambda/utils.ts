import * as AWS from 'aws-sdk'
const Lambda = new AWS.Lambda({
	region: 'eu-central-1',
})

export async function invokeLambdaSync(functionName: string, payload: any) {
	const req: AWS.Lambda.InvocationRequest = {
		FunctionName: functionName,
		Payload: JSON.stringify(payload),
		InvocationType: 'RequestResponse',
		LogType: 'Tail',
	}
	return Lambda.invoke(req).promise()
}
