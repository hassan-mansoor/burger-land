import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'burger-land';
  disabled = false;

  constructor() {}

  ngOnInit() {
    this.disabled = window.location.href.includes('monitor');
  }
}
