import * as express from 'express'
import * as http from 'http'
import * as socketIO from 'socket.io'

export class Server {
  private port : number
  private _app: express.Application
  private server: http.Server
  private io: SocketIO.Server

  constructor () {
    this._app = express()
    this.port = 9999
    this.server = http.createServer(this._app)
    this.initSocket()
    this.listen()
  }

  private listen(): void {
    this.server.listen(this.port, ()=>{
      console.log(`Listening to ${this.port}`)
    })

    this.io.on('connect', (socket: any) => {
      console.log(`Connected client on port ${this.port}`);

      socket.on('love', (m: string) => {
        console.log(`[server](message): ${JSON.stringify(m)}`);
        this.io.emit('message', m);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      })
    })
  }

  private initSocket (): void {
    this.io = socketIO(this.server)
  }

  get app() {
    return this._app
  }
}
