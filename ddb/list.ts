#! tsx

/* eslint-disable no-console */

import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

const endpoint = 'http://localhost:8000'
const ddb = new DynamoDB({ endpoint, region: 'localhost' });

(async function main() {
  await ddb.scan({ TableName: 'sessions' }).then(({ Items }) => Items?.map(i => unmarshall(i))).then(console.log)
}())
