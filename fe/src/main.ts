import { type MessageLogin, type MessageVote } from '../../be/types'

import { element } from './easy-htmlelement'

const area = element('pre')

const socket = new WebSocket('ws://localhost:8080')
socket.onmessage = e => {
  const currentTime = new Date().toISOString().slice(11, -1)
  area.elem.innerHTML += `${currentTime}: ${String(e.data)}\n`
}

const input = element('input').attrs({ type: 'number', placeholder: 'Your vote' }).styles({ width: '100%' })
const name = element('input').attrs({ type: 'text', placeholder: 'Your name' }).styles({ width: '100%' })
const session = element('input').attrs({ type: 'session', placeholder: 'The session ID' }).styles({ width: '100%' })
element(document.body).content(
  area,
  input,
  element('button').content('Send').cls('button').styles({ width: '100%' })
    .on('click', () => {
      socket.send(JSON.stringify({ action: 'vote', item: 'asdf', vote: [Number((input.elem as HTMLInputElement).value), 0] } as MessageVote));
      (input.elem as HTMLInputElement).value = ''
    }),
  name,
  session,
  element('button').content('Login').cls('button').styles({ width: '100%' })
    .on('click', () => {
      const ss = (session.elem as HTMLInputElement).value
      socket.send(JSON.stringify({ action: 'login', user: (name.elem as HTMLInputElement).value, ss: ss.length > 0 ? ss : undefined } as MessageLogin));
      (session.elem as HTMLInputElement).value = ''
    }),
)
