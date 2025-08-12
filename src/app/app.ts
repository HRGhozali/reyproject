import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {provideRouter} from '@angular/router';
import routeConfig from './routes';
import {HttpClient}  from  '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('reyproject');
  isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('logged');

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('logged');
      this.isLoggedIn = false;
      alert("Successfully logged out!")
      window.location.href = '/';
    }
  }
}
