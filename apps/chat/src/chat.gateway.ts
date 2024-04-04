import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnGatewayConnection } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  onModuleInit(client: Socket, ...args: any[]) {
    console.log('dcm');
    // console.log(client)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('zz');
    console.log(client);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(@MessageBody() body, @ConnectedSocket() client: Socket): void {
    console.log(body);
    //create room
    // user join room
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
