import { type Session } from '../ddb/types'
import { hasKey } from '../utils/maybe'

import { callbackAPI } from './callbackAPI'

export default function notify(session: Session): Promise<PromiseSettledResult<void>[]> {
  return Promise.allSettled(Object.values(session.usrs)
    .filter(hasKey('cx'))
    .map(({ cx }) => callbackAPI.postToConnection({ ConnectionId: cx, Data: JSON.stringify({ ...session, cx }) }).promise()))
}
