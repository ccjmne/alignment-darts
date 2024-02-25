#! tsx

/* eslint-disable no-console */

import { DynamoDB } from '@aws-sdk/client-dynamodb'

const endpoint = 'http://localhost:8000'
const ddb = new DynamoDB({ endpoint, region: 'localhost' })

const CX_TABLE = 'connections'
ddb.describeTable({ TableName: CX_TABLE }, err => {
  void (typeof err === 'undefined' ? Promise.resolve() : ddb.deleteTable({ TableName: CX_TABLE }))
    .then(() => ddb.createTable({
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
    }))
    .then(data => console.log('Table re-created:', data.TableDescription?.TableName))
})
