// import EventBus from 'src/shared/EventBus.ts';
//
// class WSTransport extends EventBus {
//   private socket;
//   private pingInterval;
//   private readonly pingIntervalTime = 3000;
//   private url: string;
//
//   constructor(url: string) {
//     super();
//     this.url = url;
//   }
//
//   public send(data: string | number | object) {
//     if (!this.socket) {
//       throw new Error('Socket is not connected');
//     }
//     this.socket.send(JSON.stringify(data));
//   }
//
//   public connect() {
//     if (this.socket) {
//       throw new Error('The socket already connected');
//     }
//     this.socket = new WebSocket(this.url);
//     this.subscribe(this.socket);
//     this.setupPing();
//
//     return new Promise((resolve, reject) => {
//       this.on(WSTransportEvents.Error, reject);
//       this.on(WSTransportEvents.Connected, () => {
//         this.off(WSTransportEvents.Error, reject);
//         resolve();
//       });
//     });
//   }
//
//   public close() {
//     this.socket?.close();
//     clearInterval(this.pingInterval);
//   }
//
//   private setupPing() {
//     this.pingInterval = setInterval(() => {
//       this.send({ type: 'ping' });
//     }, this.pingIntervalTime);
//
//     this.on(WSTransportEvents.Close, () => {
//       clearInterval(this.pingInterval);
//       this.pingInterval = undefined;
//     });
//   }
//
//   private subscribe(socket: WebSocket) {
//     socket.addEventListener('open', () => {
//       this.emit(WSTransportEvents.Connected);
//     });
//     socket.addEventListener('error', (e: Event) => {
//       this.emit(WSTransportEvents.Error, e);
//     });
//     socket.addEventListener('message', (message) => {
//       try {
//         const data = JSON.parse(message.data)
//         if (['pong', 'user connected'].includes(data?.type)) {
//           return
//         }
//         this.emit(WSTransportEvents.Message, data);
//       } catch (e) {
//
//       }
//     });
//   }
// }
