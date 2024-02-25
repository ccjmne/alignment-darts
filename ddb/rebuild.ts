#! tsx

/* eslint-disable no-console */

import { DynamoDB } from '@aws-sdk/client-dynamodb'

const endpoint = 'http://localhost:8000'
const ddb = new DynamoDB({ endpoint, region: 'localhost' });

(async function main() {
  const CX_TABLE = 'connections'
  await ddb.listTables({}).then(({ TableNames = [] }) => Promise.all(TableNames.map(name => ddb.deleteTable({ TableName: name }))))
  await ddb.createTable({
    TableName: CX_TABLE,
    KeySchema: [
      { AttributeName: 'primaryKey', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'primaryKey', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  })
}())
