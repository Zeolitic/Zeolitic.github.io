import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as uuid from 'uuid';



@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {

  constructor(private http: HttpClient) { }


  public messages: Message[] = [];

  public sessionId = uuid.v4();

  public clicked = false;

  public picture = 'chat';


  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    const message = new Message('bot', 'Hey there! Welcome to my website. I am BOT-Ryan 🤖. I usually answer questions correctly, however sometimes I make mistakes. If I do not understand your question the first time, please phrase it differently and I will try and answer it the best I can!');
    this.messages.push(message);

    const messaget = new Message('bot', 'If you are looking for a good starter question, may I recommend "What are your hobbies?"');
    this.messages.push(messaget);

    const that = this;

    const animation = document.getElementById('chatbutton');
    animation.addEventListener('animationiteration', async function() {
      const animation = document.getElementById('chatbutton');
      if (that.clicked) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        animation.style.animationPlayState = 'paused';
      }
    }, false);
  }

  hideChat() {

    this.clicked = true;

    const element = document.getElementById('chatbot');

    if (element.getAttribute('opened') === 'true') {
      element.setAttribute('opened', 'false');
      this.picture = 'chat';
    } else {
      element.setAttribute('opened', 'true');
      this.picture = 'close';
    }
  }

  sendMessage() {
    const inputBox = document.getElementById('chatbot-input') as HTMLInputElement;
    const val = inputBox.value;

    if (val === '') {
      return;
    }

    const message = new Message('user', val);
    this.messages.push(message);

    this.http.post<any>(
      // tslint:disable-next-line: max-line-length
      'https://dialogflow.cloud.google.com/v1/integrations/messenger/webhook/d71f41cb-7a82-4edc-810e-c5c136612389/sessions/' + this.sessionId,
      {
        queryInput: {text: {text: val, languageCode: 'en'}}
      }
    )
    .subscribe(res => {
      const message = new Message('bot', res.queryResult.fulfillmentText);
      this.messages.push(message);
    });

    inputBox.value = '';
  }
}
