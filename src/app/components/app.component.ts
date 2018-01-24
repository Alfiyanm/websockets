import {Component} from '@angular/core';
import {WebSocketService} from "../services/websocket.service";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ WebSocketService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageFromServer: string;
  title: string = 'Websocket Demo';
  ws: WebSocket;
  url:string;

  constructor(private wsService: WebSocketService) {

    this.url = environment.webSocketUrl;
    this.wsService.createObservableSocket(this.url)
      .subscribe(
        data => {
          this.messageFromServer = data;
        },
        err => console.log(err),
        () => console.log('The observable stream is complete')
      );


  }

  sendMessageToServer() {
    console.log("Client sending message to WebSocket server");
    this.wsService.sendMessage("Hello from client");
  }
}
