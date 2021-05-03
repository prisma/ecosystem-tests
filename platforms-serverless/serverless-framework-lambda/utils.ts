import * as AWS from 'aws-sdk'

const Lambda = new AWS.Lambda({
  region: process.env.AWS_DEFAULT_REGION,
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
export function deepEqual(x: any, y: any): boolean {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}
