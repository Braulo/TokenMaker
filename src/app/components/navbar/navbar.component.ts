import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public name: string = 'test';
  constructor() {}

  ngOnInit(): void {
    this.setTheme(localStorage.getItem('theme') || 'light');
  }

  toggleTheme(): void {
    this.setTheme(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: string): void {
    document.body.classList.remove(theme === 'light' ? 'dark' : 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme === 'light' ? 'light' : 'dark');
  }

  getCurrentTheme(): string {
    return localStorage.getItem('theme') || '';
  }
}
