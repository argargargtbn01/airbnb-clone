import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit() {}

  // @SubscribeMessage('message1')
  // handleMessage(client: any, payload: any): string {
  //   this.server.emit('a',{a:'b'})
  //   return 'Hello world!';
  // }

  @SubscribeMessage('createRoom')
  handleCreateRoom(@MessageBody() body, @ConnectedSocket() client: Socket): void {
    console.log(body)
    // client.join(room);
    // client.emit('roomCreated', room);
  }

  // @SubscribeMessage('createRoom')
  // handleCreateRoom(client: Socket, room: string): void {
  //   room='1'
  //   client.join(room);
  //   client.emit('roomCreated', room);
  // }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    room = '1';

    client.join(room);
    client.emit('roomJoined', room);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { room: string; message: string }): void {
    this.server.to('1').emit('message', payload.message);
  }
}
