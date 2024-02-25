import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { type Session, type SsId } from '../ddb/types'

const TableName = 'sessions'

const endpoint = 'http://localhost:8000'
const ddb = new DynamoDB({ endpoint, region: 'localhost' })

export function get(id: SsId): Promise<Session> {
  return ddb.getItem({ TableName, Key: { pk: { S: id } } })
    .then(({ Item }) => Item && unmarshall(Item) as Session)
    .then(session => (typeof session === 'object' ? session : Promise.reject(new Error('Not found'))))
}

export function put(session: Session): Promise<Session> {
  return ddb.putItem({ TableName, Item: marshall(session) })
    .then(() => session)
}
