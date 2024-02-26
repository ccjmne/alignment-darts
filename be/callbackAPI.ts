import { type WebSocket } from 'ws'

import { type CxId } from '../ddb/types'

const cx = new Map<CxId, WebSocket>()

export function on(id: CxId, ws: WebSocket): void {
  cx.set(id, ws)
}

export function off(id: CxId): void {
  cx.delete(id)
}

export const callbackAPI = {
  postToConnection({ ConnectionId, Data }: { ConnectionId: CxId, Data: string }): { promise: () => Promise<void> } {
    return {
      promise(): Promise<void> {
        const ws = cx.get(ConnectionId)
        return ws ? Promise.resolve(ws.send(Data)) : Promise.reject(new Error('No active connection with that id'))
      },
    }
  },
}
