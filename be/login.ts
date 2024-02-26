import { hasKey } from '../utils/maybe'

import { callbackAPI } from './callbackAPI'
import { get, put } from './db'
import { type Event, type Response } from './srv'

export default async function handler({ body: message, requestContext: { connectionId: cx } }: Event): Promise<Response> {
  if (message.action !== 'login') {
    return Promise.reject(new Error('Invalid message type'))
  }

  return (typeof message.ss !== 'undefined'
    ? get(message.ss).then(({ usrs, ...session }) => ({ ...session, usrs: { ...usrs, [message.user]: { cx, votes: {} } } }))
    : put({
      pk: crypto.randomUUID(),
      cfg: { items: [], dimensions: [[0, 0], [0, 0]] },
      usrs: { [message.user]: { cx, votes: {} } },
    }))
    .then(session => Promise.allSettled(
      Object.values(session.usrs)
        .filter(hasKey('cx'))
        .map(({ cx: ConnectionId }) => callbackAPI.postToConnection({ ConnectionId, Data: JSON.stringify(session) }).promise()),
    ))
    .then(() => ({ statusCode: 200 }))
}
