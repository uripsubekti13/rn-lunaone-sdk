import io from 'socket.io-client';
import  {authStore} from "../store-manager";
import { CONSTANT } from '../constant/constant'
import { getUniqueId } from 'react-native-device-info';

class SocketService {
   _socket;

  init() {
    console.log("socket initialized");
    
    if (_connected) return this._socket;
    const gateway = CONSTANT.mainUrl[authStore.ENV];
    this._socket = io(gateway, {
      // query: `token=${token}`,
      transports: ['websocket'],
    });
    this.eventListener();
    _connected = true;
    return this._socket;
  }

  eventListener() {
    if (user) {
      // on notification
      const deviceId = getUniqueId();
      this._socket.on(
        `notification-${deviceId}`,
        (data) => {
          // do something here
          
        },
      );
    }

    // on connect
    this._socket.on('connect', function() {
      console.log('Connected Socket');
    });

    // on fail connection
    // this._socket.on(CONNECTION_FAILED, _data => {
    
    //   // refresh token
    //   this.authRestService.refreshToken().subscribe(() => {
    //     this._socket.disconnect();
    //     // reconnect socket
    //     this.init();
    //   });
    // });

    // this._socket.on('test', function(data) {
    //   console.log('Socket Data:', data);
    // });

    this._socket.on('disconnect', function() {
      _connected = false;
      this._socket = undefined;
      console.log('Disconnected Socket');
    });

  }

  disconnect() {
    this._socket.disconnect();
    this._socket = null;
    _connected = false;
  }
}

export const socketService = new SocketService();