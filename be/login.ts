/* eslint-disable @typescript-eslint/no-use-before-define */
import { type CxId, type Name, type Session } from '../ddb/types'

import { get, put } from './db'
import notify from './notify'
import { type Event, type Response } from './srv'

export default async function handler({ body: message, requestContext: { connectionId: cx } }: Event): Promise<Response> {
  if (message.action !== 'login') {
    return Promise.reject(new Error('Invalid message type'))
  }

  return (typeof message.ss !== 'undefined'
    ? get(message.ss).then(session => put(login(session, message.user, cx)))
    : put({
      pk: crypto.randomUUID(),
      cfg: { items: [], dimensions: [[0, 0], [0, 0]] },
      usrs: { [message.user]: { cx, votes: {} } },
    }))
    .then(notify)
    .then(() => ({ statusCode: 200 }))
}

// Attempt to match the name to another in the session (case-insensitive) and update its cx to the new value.
// Fail if another live connection is already using the name.
function login(session: Session, name: Name, cx: CxId): Session {
  const usr = Object.entries(session.usrs).find(([n]) => n.toLowerCase() === name.toLowerCase())?.[1] ?? { votes: {} }
  if ('cx' in usr) {
    throw new Error('User already logged in')
  }

  const usrs = Object.fromEntries(
    [...Object.entries(session.usrs).filter(([n]) => n.toLowerCase() !== name.toLowerCase()), [name, { ...usr, cx }]],
  )

  return { ...session, usrs }
}
