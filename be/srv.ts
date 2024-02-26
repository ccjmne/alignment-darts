#! tsx

/* eslint-disable no-console */

import { WebSocketServer } from 'ws'

import { type CxId } from '../ddb/types'

import { off, on } from './callbackAPI'
import loginHandler from './login'
import { type Message } from './types'

export type Response = { statusCode: number, body?: string }
export type Event = {
  body: Message;
  requestContext: { connectionId: CxId };
}

const wss = new WebSocketServer({ port: 8080 })
wss.on('connection', ws => {
  const connectionId = crypto.randomUUID()

  on(connectionId, ws)
  console.debug(`${new Date().toISOString().slice(11, -1)} - opened`)

  ws.on('close', () => {
    off(connectionId)
    console.debug(`${new Date().toISOString().slice(11, -1)} - closed`)
  })

  ws.on('message', (buf: Buffer) => {
    const data = JSON.parse(String(buf)) as Message
    const event: Event = { body: data, requestContext: { connectionId } };
    (function dispatch() {
      switch (data.action) {
      case 'login':
        console.debug(`User ${data.user} connected`)

        return loginHandler(event)

      case 'config':
        console.debug('Config received')

        return Promise.resolve()

      case 'vote':
        console.debug('Vote received')

        return Promise.resolve()

      default:
        console.debug('Unknown message', data)

        return Promise.reject(new Error('Unknown message'))
      }
    }()).catch(console.error)
  })
})
