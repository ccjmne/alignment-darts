import { type MessageLogin } from '../../be/types'

function log(msg: string): void {
  console.log(`${new Date().toISOString().slice(11, -1)}: ${msg}`)
}

const socket = new WebSocket('ws://localhost:8080')
socket.onmessage = ({ data }) => log(String(data))

export default function join({ username, session }: { username: string, session?: string }): void {
  socket.send(JSON.stringify({ action: 'login', user: username, ss: session } as MessageLogin))
}
