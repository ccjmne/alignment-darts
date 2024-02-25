import { type Session } from '../ddb/types'

import { get, put } from './db'
import { type Event } from './srv'

export default async function handler({ body: message, requestContext: { connectionId } }: Event): Promise<Session> {
  if (message.action !== 'login') {
    return Promise.reject(new Error('Invalid message type'))
  }

  return typeof message.ss !== 'undefined'
    ? get(message.ss).then(({ cx, ...session }) => ({ ...session, cx: { ...cx, [connectionId]: message.user } }))
    : put({
      pk: crypto.randomUUID(),
      cx: { [connectionId]: message.user },
      cfg: { items: [], dimensions: [[0, 0], [0, 0]] },
      votes: {},
    })
}
