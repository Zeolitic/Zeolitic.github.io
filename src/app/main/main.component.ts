import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  public interval;
  public index = -1;
  public array = ['Car enthusiast', 'Moutain biker', 'Computer science major', 'Buisness minor'];


  typeWriter() {

    const element = document.getElementById('typingAnimation');
    this.startTimer(this.wordChoser(), element);

  }



  startTimer(word: string, element: HTMLElement) {
    let counter = 0;
    this.interval = setInterval(() => {
      if (counter === word.length) {
        clearInterval(this.interval);
        this.pause(word, element);
      } else {
        element.innerHTML += word.charAt(counter);
        counter++;
      }
    }, 150);
  }

  pause(word: string, element: HTMLElement) {
    let counter = 0;
    this.interval = setInterval(() => {
      if (counter === 1) {
        clearInterval(this.interval);
        this.erase(word, element);
      } else {
        counter++;
      }
    }, 1000);
  }


  erase(word: string, element: HTMLElement) {
    let counter = 0;
    this.interval = setInterval(() => {
      if (counter === word.length) {
        clearInterval(this.interval);
        this.typeWriter();
      } else {
        let temp = element.innerHTML;
        temp = temp.substring(0, temp.length - 1);
        element.innerHTML = temp;
        counter++;
      }
    }, 90);
  }

  wordChoser() {

    this.index++;
    this.index = this.index % this.array.length;

    const word = this.array[this.index];
    return word;
  }

  ngOnInit() {
    this.typeWriter();

  }

}
