#! tsx

/* eslint-disable no-console */

import { DynamoDB } from '@aws-sdk/client-dynamodb'

const endpoint = 'http://localhost:8000'
const ddb = new DynamoDB({ endpoint, region: 'localhost' });

(async function main() {
  const SESSIONS_TABLE = 'sessions'

  console.info('Deleting all tables...')
  await ddb.listTables({}).then(({ TableNames = [] }) => Promise.all(TableNames.map(name => ddb.deleteTable({ TableName: name }))))

  console.info(`Rebuilding table '${SESSIONS_TABLE}'...`)
  await ddb.createTable({
    TableName: SESSIONS_TABLE,
    KeySchema: [
      { AttributeName: 'pk', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pk', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  })

  console.info('Done.')
}())
