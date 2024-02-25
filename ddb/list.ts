#! tsx

/* eslint-disable no-console */

import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

import { type Session } from './types'

const endpoint = 'http://localhost:8000'
const ddb = new DynamoDB({ endpoint, region: 'localhost' });

(async function main() {
  await ddb.scan({ TableName: 'sessions' }).then(({ Items }) => Items?.map(i => unmarshall(i) as Session[])).then(console.log)
}())
