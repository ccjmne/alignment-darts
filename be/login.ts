import { callbackAPI } from './callbackAPI'
import { get, put } from './db'
import { type Event, type Response } from './srv'

export default async function handler({ body: message, requestContext: { connectionId } }: Event): Promise<Response> {
  if (message.action !== 'login') {
    return Promise.reject(new Error('Invalid message type'))
  }

  return (typeof message.ss !== 'undefined'
    ? get(message.ss).then(({ cx, ...session }) => ({ ...session, cx: { ...cx, [connectionId]: message.user } }))
    : put({
      pk: crypto.randomUUID(),
      cx: { [connectionId]: message.user },
      cfg: { items: [], dimensions: [[0, 0], [0, 0]] },
      votes: {},
    }))
    .then(session => Promise.allSettled(
      Object.keys(session.cx).map(cx => callbackAPI.postToConnection({ ConnectionId: cx, Data: JSON.stringify(session) }).promise()),
    ))
    .then(() => ({ statusCode: 200 }))
}
