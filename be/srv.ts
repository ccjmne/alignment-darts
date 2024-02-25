#! tsx

/* eslint-disable no-console */

import { WebSocketServer, type WebSocket } from 'ws'

import { type CxId } from '../ddb/types'

import loginHandler from './login'
import { type Message } from './types'

export type Event = {
  body: Message;
  requestContext: { connectionId: CxId };
}

const wss = new WebSocketServer({ port: 8080 })
const cx = new Map<CxId, WebSocket>()

export default {
  postToConnection({ ConnectionId, Data }: { ConnectionId: CxId, Data: string }): { promise: () => Promise<void> } {
    return {
      promise(): Promise<void> {
        const ws = cx.get(ConnectionId)
        return ws ? Promise.resolve(ws.send(Data)) : Promise.reject(new Error('No active connection with that id'))
      },
    }
  },
}

wss.on('connection', ws => {
  const connectionId = crypto.randomUUID()

  cx.set(connectionId, ws)
  console.debug(`${new Date().toISOString().slice(11, -1)} - opened`)

  ws.on('close', () => {
    cx.delete(connectionId)
    console.debug(`${new Date().toISOString().slice(11, -1)} - closed`)
  })

  ws.on('message', (data: Message) => {
    try {
      const event: Event = { body: data, requestContext: { connectionId } }
      switch (data.action) {
      case 'login':
        console.debug(`User ${data.user} connected`)
        void loginHandler(event)
        break

      case 'config':
        console.debug('Config received')
        break

      case 'vote':
        console.debug('Vote received')
        break

      default:
        console.debug('Unknown message')
      }
    } catch (e) {
      console.error(e)
    }
  })
})
